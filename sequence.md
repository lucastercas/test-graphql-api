## Primeira parte

1. Com TypeScript, é mais fácil tipar os resolvers
1. User um `enum` pra separar admins de clients
   - Se o servidor retornar uma string que não está no enum, da erro
1. userByAccess é so uma query, porém o cliente pode usar para conseguir tanto os clientes quanto os administradores, e todo o processamento fica no servidor, ou seja, o cliente não tem nenhum `for` nem nada.
   - Se passar uma string que não ta no enum, da erro
