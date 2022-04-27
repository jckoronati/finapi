const express = require('express');
const { v4 } = require('uuid');
const app = express();

app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    if (!customer)
        return response.status(400).send("Customer not found!");

    request.customer = customer;

    return next();
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit')
            return acc + operation.amount;
        else
            return acc - operation.amount
    }, 0);

    return balance;
}

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExists)
        return response.status(400).send(`O CPF ${cpf} já está sendo utilizado`);

    customers.push({
        cpf,
        name,
        uuid: v4(),
        statement: []
    });

    return response.status(201).send(`O cliente com o ${cpf} foi cadastrado com sucesso`);
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statement);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount)
        return response.status(400).send({ error: "Insufficient funds!" });

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: 'debit'
    };

    customer.statement.push(statementOperation);

    return response.status(201).send();
});

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");
    const statements = customer.statement.filter((statement) => {
        return statement.created_at.toDateString() === new Date(dateFormat).toDateString();
    });

    return response.json(statements);
});

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
});

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer);
});

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    customers.splice(customer, 1);

    return response.status(200).json(customers);
});

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;

    const balance = getBalance(customer.statement);

    return response.status(200).json(balance);
});

app.listen(3333);