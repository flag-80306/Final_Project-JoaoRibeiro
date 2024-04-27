1º - organização da base de dados com reviews
(fazer um put para o cliente em cada tour realizada?)

####

2º - Na query da função update adiciono todo os campos e aqueles que não quero
alterar deixo NULL ou apenas coloco os que pretendo mudar?
const sql = 'UPDATE tours SET name = ?, location = ?, latitude = ?, longitude = ?, description = ?, duration = ?, price_person = ?, guide_id = ?, images = ? WHERE tour_id = ?';
Aqui falta review_id, created_ay, updated_at.

####

3º - Deveo ter um put para cada campo individualmente ou para algum em específico?

####

4º - delete no insomnia demora muito e faz request canceled mas retira linha do mySQL

####

5º - como funciona a relação entre o guia e as tours que realiza e como adicionar mais que 1 tour ao guia.
