1º - organização da base de dados com reviews
(fazer um put para o cliente em cada tour realizada? para o review)

####

2º - Na query da função update adiciono todo os campos e aqueles que não quero
alterar deixo NULL ou apenas coloco os que pretendo mudar?
const sql = 'UPDATE tours SET name = ?, location = ?, latitude = ?, longitude = ?, description = ?, duration = ?, price_person = ?, guide_id = ?, images = ? WHERE tour_id = ?';
Aqui falta review_id, created_ay, updated_at.

####

3º - Devo ter um put para cada campo individualmente ou para algum em específico?

####

4º - com a query que adicionei consigo os ver os guias todos para cada tour_id mas se procuirar apenas um tour_id só aparece 1 guide_id.

####

5º - Podemos manter o console.log(error) ou retiramos a partir do momento em que funciona?

####

6º - fotos na base de dados, como colocar? rota em relação ao index.js?

####

7º - quando os espaços não tem preenchimento obrigatório na base de dados devo deixar o espaço como podendo estar em branco ou posso usar o NULL

####
