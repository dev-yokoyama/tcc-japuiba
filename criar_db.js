import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

const db = new sqlite3.Database('banco.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados SQLite.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produtos6 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            imagem TEXT,
            titulo TEXT,
            item TEXT,
            descr TEXT,
            marca TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err.message);
        } else {
            console.log('Tabela "produtos" verificada/criada com sucesso.');
        }
    });
});

const produtos = [
    { imagem:"../img/produtos2-removebg-preview.png", titulo: "Marcador Artístico Permanente 6 Cores", item: "Marcador", descricao: "6 cores vintagePonta 1mm Permanente em diversas superfícies como madeira, metais, cerâmica, tecidos. Uso artístico e profissional Tinta com secagem rápida", marca: "BRW" },
    { imagem: "../img/produto6-removebg-preview (1).png", titulo: "Quadro Branco UV Madeira Neo ", item: "Quadro", descricao: "Quadro branco com moldura em madeira pinus de reflorestamento, cantos em plástico e fixação invisível. Tampo em chapa de fibra de madeira para uso de marcador de quadro branco. Recomendado uso de apagadores ou flanela macia e marcadores de quadro de boa qualidade.", marca: "STALO" },
    { imagem:"../img/produtos3-removebg-preview.png", titulo: "Cola Silicone Líquida", item: "Cola", descricao: "É uma cola de silicone para uso em trabalhos manuais, composto por acetato de polivilina, etanol e aditivo. Sua aplicação é para pano, papel, papelão, espuma, madeira e outros (Testar antes de iniciar os trabalhos). Deve ser usada em superfícies isentas de impurezas. ", marca: "RENDICOLLA" },
    { imagem:"../img/produtos4-removebg-preview.png", titulo: "Caneca Mini Tina Sanji", item: "Caneca", descricao: "A caneca é importada, possui detalhes incríveis que vão fazer você se apaixonar! Com 100ml de capacidade, é a companhia perfeita para quem ama a hora do café da tarde! Feita em cerâmica, com uma base empilhável perfeita que te ajuda na hora de organizar as suas minis tinas!", marca: "Zona Criativa" },



    { imagem:"../img/produtos5-removebg-preview.png", titulo: "Marcador Posca PC", item: "Marcador", descricao: "Marcador multiuso .À base de água. Cores vivas e intensas. Uso em papéis claros e escuros. Não tóxico. Espessura do traço: 8-17mm Escreve aproximadamente 200 metros.", marca: "Uni-Ball" },
    { imagem:"../img/produtos6-removebg-preview.png", titulo: "Estojo Duplo Grande Académie", item: "Estojo", descricao: "O Estojo Duplo Grande Académie Cereja é prático, espaçoso e ideal para quem possui muitos lápis, canetas e outros materiais e acessórios.", marca: "TILIBRA" },
    { imagem:"../img/produtos7-removebg-preview.png", titulo: "Copo Viagem Mundo da Lua", item: "Copo", descricao: "Vai dar uma volta na lua e ainda não achou um copo que te acompanhe? A gente te ajuda! Com 500 de capacidade, esse copo te mantém sempre hidratado e nunca fica vazio! Não importa qual é a bebida, esse copo te acompanha em todas as suas aventuras!", marca: "ZONA CRIATIVA" },
    { imagem:"../img/produtos8-removebg-preview.png", titulo: "Mochila Académie Young Ochre", item: "Mochila", descricao: "A Mochila de Costas Académie Young Ochre é confeccionada em material resistente, com base reforçada, parte interna forrada e alças acolchoadas e ajustáveis para garantir conforto a quem utilizá-la.", marca: "TILIBRA" },



    { imagem:"../img/produtos9-removebg-preview.png", titulo: "Giz Pastel Oleoso", item: "Giz", descricao: "O giz pastel oleoso é ótimo para fazer esboços coloridos e trabalhos artísticos, principalmente em papéis de alta gramatura. Produz cores vivas, intensas, pastosas e brilhantes!", marca: "PENTEL" },
    { imagem:"../img/produtos10-removebg-preview.png", titulo: "Lapis Integral", item: "Lapis", descricao: "Lápis feito inteiramente de grafite, envolto em película plástica. em graduações variando de HB a 8B. Ideal para desenhos amplos em áreas grandes, com diversas texturas.", marca: " Koh-I-Noor" },
    { imagem:"../img/produtos11-removebg-preview.png", titulo: "Papel Especial", item: "Papel", descricao: "Papel colorido, com efeito “neon”. Formato A-4 180 g/m². Embalagem com 20 fls. de cores únicas: Pink, Laranja, Verde e Amarelo.", marca: "OFF PAPER" },
    { imagem:"../img/produtos12-removebg-preview.png", titulo: "Lancheira Académie Listras", item: "Lancheira", descricao: "A Lancheira Tiracolo Académie Listras e Poás é resistente e possui material interno que ajuda a conservar a temperatura dos alimentos, além de ser de fácil limpeza. Possui alça removível.", marca: "TILIBRA" },






    { imagem:"../img/produtos14-removebg-preview.png", titulo: "Pasta Portfólio", item: "Pasta", descricao: "Cores: Preta Formato: A3 - 320 mm x 425 mm Capacidade: 10 envelopes plásticos médios e 4 parafusos metálicos Composição/Material: PVC", marca: "DAC"},
    { imagem:"../img/produtos13-removebg-preview.png", titulo: "Caderno Universitário Capa Dura", item: "Caderno", descricao: "O Caderno Universitário Capa Dura I am Groot representa um queridíssimo personagem da Marvel - o guardião da galáxia preferido e mais amado do público e mundo geek.", marca: "FORONI" },
    { imagem:"../img/produtos15-removebg-preview.png", titulo: "Penas para desenho e caligrafia", item: "Penas", descricao: "São penas feitas em metal e que devem ser encaixadas em cabos apropriados, para trabalhar as técnicas de bico-de-pena, que podem ser caligráficas ou desenhos, como hachuras e pontilhismo.", marca: "KERAMIK"},
    { imagem:"../img/produtos16-removebg-preview.png", titulo: "Caneta Esferográfica Shake", item: "Caneta", descricao: "A Caneta Esferográfica Shake é um modelo de escrita com mecanismo de ativação por agitação. Ao balançar a caneta, a tinta é ativada, oferecendo uma experiência prática e sem a necessidade de pressionar o botão.", marca: "CROWN" },


    
    { imagem:"../img/produtos17-removebg-preview.png", titulo: "Brush Pen Ponta Dupla", item: "Brush ", descricao: "Uma caneta - duas pontas; ponta pincel flexivel e ponta fina Para efeitos aquarela na maioria dos papéis aquarela Traço da ponta pincel de aproximadamente 1.0 - 6.0 mm, traço da ponta fina de aproximadamente 0.5 - 0.8 mm", marca: "STAEDTLER" },
    { imagem:"../img/produtos18-removebg-preview.png", titulo: "Kit Caneca Pequena + Bandeja Mãe Leoa", item: "Kit Caneca", descricao: "A mãe leoa é corajosa, mesmo quando está com medo. É forte, mesmo quando se sente fraca. É sábia, mesmo quando pensa não saber mais o que fazer. A coleção Mãe Leoa, que combina tons terrosos com elementos e frases marcantes é perfeita para presentear a sua mãe, que te protege com unhas e dentes.", marca:"SIMAS"},
    { imagem:"../img/produtos19-removebg-preview.png", titulo: "Prancheta Portátil A3 com Régua Paralela", item: "Prancheta", descricao: "Estojo de madeira, finamente acabado, com espaço para guardar papéis e acessórios para desenho. Seu tampo/prancheta permite a regulagem da inclinação e já vem equipado com régua paralela.", marca:"TRIDENT" },
    { imagem:"../img/produtos20-removebg-preview.png", titulo: "Aquarela em Pastilha Matiz Metallic ", item: "Aquarela", descricao: "A aquarela em pastilha MATIZ possui cores brilhantes com alta transparência, boa resistência à luz e excelente mistura. Acomodada em estojos práticos com godês internos, pode ser levada para qualquer lugar.", marca: "ARTOOLS" },



    { imagem:"../img/produtos21-removebg-preview.png", titulo: "Lápis de Cor Big Criatic", item: "Lápis", descricao: "Tamanho BIG. Alta qualidade. Cores vibrantes. Mina super resistente. Corpo plástico triangular. Contém apontador.", marca: "CIS" },
    { imagem:"../img/produtos22-removebg-preview.png", titulo: "Pasta Catálogo PVC Preto", item: "Pasta", descricao: "Cor: Preto, Formato: Ofício 240 mm x 330 mm Composição/Material: PVC Detalhes: 20 envelopes finos, 4 colchetes e solda micro serrilhada que garante qualidade.", marca: "DAC" },
    { imagem:"../img/produtos23-removebg-preview.png", titulo: "Globo Histórico", item: "Globo", descricao: "Informações históricas sobre a terra, retratando as grandes navegações dos séc. XV e XVI, com imagens e breve histórico dos principais descobridores.", marca: "LIBRERIA" },
    { imagem:"../img/produtos24-removebg-preview.png", titulo: "Tinta Pinta Couro", item: "Tinta", descricao: "Tinta acrílica especial para restaurar couros naturais! Também pode ser utilizada em outras superfícies porosas. Secagem completa após 72h.", marca: "GLITTER" },






    { imagem:"../img/produtos25-removebg-preview.png", titulo: "Tesoura Artesanal Profissional", item: "Tesoura", descricao: "Tesoura para cortes com efeito zigue-zague ou ondulado, em papel ou em EVA.", marca: "SELLER" },
    { imagem:"../img/produtos26-removebg-preview.png", titulo: "Cola Universal", item: "Cola", descricao: "A Cola Universal Artesanato Rendicolla foi desenvolvida especialmente para uso em trabalhos manuais, artesanato e hobbies. Indicada para uso em papel, papel cartão, couro, renda, tecido, cortiça, passamanaria, madeira balsa, acrílico,", marca: "RENDICOLLA" },
    { imagem:"../img/produtos27-removebg-preview.png", titulo: "Régua T Fixo 50 cm.", item: "Régua", descricao: "Régua T de madeira e cabeçote fixo. Fabricada em madeira de lei tratada. A prova de torção e empenamento.", marca: "TRIDENT" },
    { imagem:"../img/produtos28-removebg-preview.png", titulo: "Almofada Rosquinha Donut Chocolate ", item: "Almofada", descricao: "Almofada perfeita para quem ama doces coloridos, em especial, um delicioso donut ^ - Tamanho aproximado: 40 x 40 cm - Estampa: frente e verso - Material: poliéster / fibra de poliester siliconizada", marca: "YAAY!" },



    { imagem:"../img/produtos29-removebg-preview.png", titulo: "Jogo do Mico", item: "Jogo", descricao: "Jogo de ação, estratégia e memória, composto de 55 cartas. Para crianças a partir de 4 anos, ideal envolvendo amigos e família, para grupos de 2 a 6 pessoas.", marca: "COPAG" },
    { imagem:"../img/produtos30-removebg-preview.png", titulo: "Borracha p/grafite", item: "Borracha", descricao: "Borracha macia, utilizada para apagar desenhos a grafite.", marca: "KOH-I-NOOR" },
    { imagem:"../img/produtos31-removebg-preview.png", titulo: "Caneca Tom I Love Dogs", item: "Caneca", descricao: "A caneca é importada e é uma excelente companhia. Em dias quentes te acompanha naquela cervejinha, refri ou suco bem geladinhos e no frio ela não te deixa na mão, te acompanha no chocolate quente ou café com leite! Não importa o clima e a bebida a caneca Tom não te abandona! São 350ml de capacidade, feita em cerâmica com detalhes, ", marca: "ZONA CRIATIVA" },
    { imagem:"../img/produtos32-removebg-preview.png", titulo: "Garrafa 1L Sede", item: "Garrafa", descricao: "As garrafas de vidro dão um toque sofisticado à sua cozinha na hora de servir um suco, água ou até mesmo drinks especiais. Além disso, sua geladeira ficará muito mais bonita e organizada. Uma das vantagens do vidro é que ele não deixa gosto nem cheiro nos líquidos,", marca: "UATT?" },



    { imagem:"../img/produtos33-removebg-preview.png", titulo: "Bloco Papel Paleta A4", item: "Bloco", descricao: "Paleta de Papel Corfix, próprio para mistura de tintas. Prático, folhas descartáveis. Papel preparado para receber tinta a óleo e acrílica. Bloco composto por 40 folhas de papel paleta no tamanho 210 x 297mm A4.", marca: "CORFIX" },
    { imagem:"../img/produtos34-removebg-preview.png", titulo: "Areia Mágica", item: "Areia", descricao: "Diverte e desenvolve a criatividade Um pedacinho da praia na sua casa. Com cheirinho de praia. Lavável. Não mancha a roupa. Contém 1 molde.", marca: "ACRILEX" },
    { imagem:"../img/produtos35-removebg-preview.png", titulo: "Corretivo Ecolutions Base Água ", item: "Corretivo", descricao: "Fórmula à base de água: sem odor, não tóxico e seguro para crianças Cobre na primeira aplicação. Não prejudica o meio ambiente", marca: "BIC" },
    { imagem:"../img/produtos36-removebg-preview.png", titulo: "Grafite Ain Stein 0.9mm", item: "Grafite", descricao: "O graite Ain Stein foi desenvolvido para lhe oferecer um nível elevado de resistência suportando uma maior pressão na hora da escrita, sem perder a suavidade e tonalidade, tudo isso graças a sua nova estrutura em formato de colmeia.", marca: "PENTEL" },

];

function popularTabelaProdutos() {
    produtos.forEach(produto => {
        db.run(
            `INSERT INTO produtos6 (imagem, titulo, item, descr, marca) VALUES (?, ?, ?, ?, ?)`,
            [produto.imagem, produto.titulo, produto.item, produto.descricao, produto.marca],
            (err) => {
                if (err) {
                    console.error('Erro ao inserir o produto:', err.message);
                } else {
                    console.log(`Produto "${produto.titulo}" inserido com sucesso.`);
                }
            }
        );
    });
}

popularTabelaProdutos();

db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
});
