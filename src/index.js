const express = require('express');
const { v4 } = require('uuid');
const app = express();

app.use(express.json());

const customers = [];

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

app.listen(3333);