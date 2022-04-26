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

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;

    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if (customerAlreadyExists)
        return response.status(400).send(`O CPF ${cpf} já está sendo utilizado`);

    customers.push({
        cpf,
        name,
        uuid: v4(),
        statament: []
    });

    return response.status(201).send(`O cliente com o ${cpf} foi cadastrado com sucesso`);
});

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request;
    return response.json(customer.statament);
});

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const { customer } = request;

    const statamentOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customer.statament.push(statamentOperation);

    return response.status(201).send();
});

app.listen(3333);