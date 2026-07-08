# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ X ] Deve ser possível se cadastrar;
- [ X ] Deve ser possível se autenticar;
- [ X ] Deve ser possível obter o perfil de um usuário logado;
- [ X ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ X ] Deve ser possível o usuário obter seu histórico de check-in;
- [ X ] Deve ser possivel o usuário buscar academias próximas;
- [ X ] Deve ser possível o usuário buscar academias pelo nome;
- [ X ] Deve ser possível usuário realizar check-in em uma academia;
- [ X ] Deve ser possível validar o check-in de um usuário;
- [ X ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ X ] O usuário não deve se cadastrar com um e-mail duplicado;
- [ X ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ X ] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
- [ X ] O check-in só pode ser validade até 20 minutos após ser criado;
- [ X ] O check-in só pode ser validade por adms;
- [ X ] A academia só pode ser cadastrada por adms;

## RNFs (Requisitos não-funcionais)

- [ X ] A senha do usuário precisa estar criptografada;
- [ X ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ X ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ X ] O usuário deve ser identificado por um JWT (JSON Web Token)