const express = require('express');
const { v4 } = require('uuid');
const app = express();

app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const uuid = v4();

    customers.push({
        cpf,
        name,
        uuid,
        statament: []
    });

    return response.status(201).send(`O cliente ${cpf} foi cadastrado com sucesso`);
});

app.listen(3333);