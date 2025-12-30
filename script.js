let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
let comments = JSON.parse(localStorage.getItem('nexus_comments')) || [];
let firebaseEnabled = false;
let fbRef = null;
let remoteConfig = { url: '', headerName: '', headerValue: '', autoSync: false };
let remoteSyncIntervalId = null;


remoteConfig.provider = remoteConfig.provider || '';
remoteConfig.providerData = remoteConfig.providerData || {};
let historyStack = ['home'];
let emailConfig = JSON.parse(localStorage.getItem('nexus_email_cfg') || '{}') || { serviceId:'', templateId:'', publicKey:'', ownerEmail:'' };

const staffMembers = [
    { name: "Gabriel Defreyn", role: "CEO", country: "Brazil", flag: "🇧🇷" },
    { name: "Luis Alberto Otto", role: "Vice-Diretor Executivo", country: "Brazil", flag: "🇧🇷" },
    { name: "Yasmin Morais de Souza", role: "Co-CEO", country: "Brazil", flag: "🇧🇷" },
    { name: "Adrian Keller", role: "Investidor Anjo", country: "Germany", flag: "🇩🇪" },
    { name: "Marco Bruni", role: "Diretor de Operações", country: "Italy", flag: "🇮🇹" },
    { name: "Elena Moreau", role: "Head de Produto", country: "France", flag: "🇫🇷" },
    { name: "Jonas Berg", role: "CTO", country: "Sweden", flag: "🇸🇪" },
    { name: "Mathias Vogel", role: "Chefe de Logística", country: "Austria", flag: "🇦🇹" },
    { name: "Pieter van Dijk", role: "Diretor Comercial", country: "Netherlands", flag: "🇳🇱" },
    { name: "Sofia Petrov", role: "Analista de Mercado", country: "Bulgaria", flag: "🇧🇬" },
    { name: "Rafael Sousa", role: "Gestor de Fornecedores", country: "Portugal", flag: "🇵🇹" },
    { name: "Gustav Hoffmann", role: "Especialista em Infraestrutura", country: "Germany", flag: "🇩🇪" },
    { name: "Ines Oliveira", role: "Head de Marketing", country: "Portugal", flag: "🇵🇹" },
    { name: "Luca Romano", role: "Gerente de Projetos", country: "Italy", flag: "🇮🇹" },
    { name: "Katarina Novak", role: "Diretora de RH", country: "Czechia", flag: "🇨🇿" },
    { name: "Oliver Schmidt", role: "Chefe de Segurança", country: "Germany", flag: "🇩🇪" },
    { name: "Marta Kowalska", role: "Analista Financeira", country: "Poland", flag: "🇵🇱" },
    { name: "Thomas Beck", role: "Desenvolvedor Sênior", country: "Switzerland", flag: "🇨🇭" },
    { name: "Nikolai Hansen", role: "Gerente de Produto", country: "Denmark", flag: "🇩🇰" },
    { name: "Eva Jónsdóttir", role: "Coordenadora de Eventos", country: "Iceland", flag: "🇮🇸" },
    { name: "Liam O'Connor", role: "Relações Institucionais", country: "Ireland", flag: "🇮🇪" },
    { name: "Marie Dubois", role: "UX Researcher", country: "France", flag: "🇫🇷" },
    { name: "Henrik Larsson", role: "Especialista Mobile", country: "Sweden", flag: "🇸🇪" },
    { name: "Anton Petrovic", role: "Arquiteto de Sistemas", country: "Croatia", flag: "🇭🇷" },
    { name: "Sven Larsen", role: "Logística Internacional", country: "Norway", flag: "🇳🇴" },
    { name: "Beatrice Muller", role: "Compliance", country: "Belgium", flag: "🇧🇪" },
    { name: "Daniela Rossi", role: "Comunicação", country: "Italy", flag: "🇮🇹" },
    { name: "Pavel Ivanov", role: "Analista de Dados", country: "Russia", flag: "🇷🇺" },
    { name: "Marta Silva", role: "Operações", country: "Portugal", flag: "🇵🇹" },
    { name: "Erik Nielsen", role: "Chefe de Vendas", country: "Denmark", flag: "🇩🇰" },
    { name: "Clara Fischer", role: "Design Lead", country: "Germany", flag: "🇩🇪" },
    { name: "Jorge Alvarez", role: "Supply Chain", country: "Spain", flag: "🇪🇸" },
    { name: "Iwona Zielinska", role: "Customer Success", country: "Poland", flag: "🇵🇱" },
    { name: "Nadir Haddad", role: "Parcerias Internacionais", country: "Turkey", flag: "🇹🇷" },
    { name: "Mikhail Sokolov", role: "Infra & Ops", country: "Ukraine", flag: "🇺🇦" },
    { name: "Fatima El Amrani", role: "Marketing Regional", country: "Morocco", flag: "🇲🇦" },
    { name: "Carlos Menendez", role: "Gestor de Produto LatAm", country: "Argentina", flag: "🇦🇷" },
    { name: "Nikhil Kapoor", role: "Parcerias APAC", country: "India", flag: "🇮🇳" },
    { name: "Keiko Tanaka", role: "Experiência do Usuário", country: "Japan", flag: "🇯🇵" },
    { name: "Samuel Reed", role: "Infraestrutura Cloud", country: "United Kingdom", flag: "🇬🇧" },
    { name: "Aline Costa", role: "Financeiro", country: "Brazil", flag: "🇧🇷" },
    { name: "Diego Morales", role: "Operações LatAm", country: "Mexico", flag: "🇲🇽" },
    { name: "Renato Carvalho", role: "Investidor Corporativo", country: "Brazil", flag: "🇧🇷" },
    { name: "Mariana Teixeira", role: "Gerente de Parcerias", country: "Brazil", flag: "🇧🇷" },
    { name: "Paulo Andrade", role: "Analista de Expansão", country: "Brazil", flag: "🇧🇷" },
    { name: "Clara Ribeiro", role: "Diretora de Produto", country: "Brazil", flag: "🇧🇷" },
    { name: "Thiago Barros", role: "Operações", country: "Brazil", flag: "🇧🇷" },
    { name: "Vanessa Moreira", role: "Customer Success", country: "Brazil", flag: "🇧🇷" },
    { name: "Oliver White", role: "Analista de Segurança", country: "United Kingdom", flag: "🇬🇧" },
    { name: "Anja Petrova", role: "Pesquisa de Mercado", country: "Slovakia", flag: "🇸🇰" },
    { name: "Victor Hugo", role: "Desenvolvimento Frontend", country: "France", flag: "🇫🇷" },
    { name: "Sofia Lindberg", role: "Operações Europeias", country: "Finland", flag: "🇫🇮" },
    { name: "Marek Novak", role: "Administrador de Rede", country: "Poland", flag: "🇵🇱" },
    { name: "Helena Duarte", role: "Relacionamento B2B", country: "Portugal", flag: "🇵🇹" },
    { name: "Oskar Bergstrom", role: "Estratégia", country: "Sweden", flag: "🇸🇪" },
    { name: "Lucia Fernandez", role: "Comunicação interna", country: "Spain", flag: "🇪🇸" },
    { name: "Rui Mendes", role: "Logística Europe", country: "Portugal", flag: "🇵🇹" },
    { name: "Thomas Müller", role: "Controller Financeiro", country: "Germany", flag: "🇩🇪" }
];

const catalog = {
    pc: [
        { id: 101, name: "Pc Gamer Intel Core I9 9 Memória 16Gb Ram Rtx2060 Ssd 960Gb ", price: 7500, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQrxfaqisw6dbZjSsl04PK4dA8gf8cdHxkmyw7SuImwJznh-QIH8oYNDhbtbumMyp9mFgb-mgshI9PbLoNk01kSMsP1szMPtaHzsqB8b78SQC9oEb0TtGwTgA" },
        { id: 102, name: "Msi Stealth 16 Ai · Amd Ryzen Ai 9 Hx 370 RTX Tela 16' Qhd+ SSD Nvme Ram 32gb", price: 52000, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRSQr58EzSif3rzID4fyaykDj8ZdQ9kla1M0DRjipXL4zVFUAKfkU2Mo7JC47akK669_B4HIeuIPyPZsswqVQav_NF25CHsTg" },
        { id: 103, name: "Pro X Workstation - AMD Ryzen 9 9900X 12 C 24 T, NVIDIA RTX 5070 12GB, 64GB DDR5 RAM 6000MHz, 2TB SSD Gen 5 + 24TB HDD, 850W PSU, Tower CPU Cooler, Wi-Fi + BT22000", price: 22000, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTIfqz9IB2a-4f-qkhYxLxjAqvDEz8RbLm7V6uHXFUIuL1mfUp29b7HzzSBKTFiWtfaQbJtZM6UcGgHsJg4LTzgYO_oZWiwC6cv7o-4GDBO" },
      
        { id: 105, name: "Msi Geforce Rtx 4090 Suprim X 24G 912-V510-400     ", price: 25000, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS6lX_bm0nLv-yt2WDRdGd7xyfLtI7vIbMrBXwUrMXKXDwoeI3NTGMMov0XqjUgCrpteLmQ-f_0kWQG6DIy208AtFd04gGLXSvfKZEuS_G-to_kvOVPgyNLmLU" },
        
       
        { id: 113, name: "PC Gamer Pichau Cratos V, AMD Ryzen 7 5700X, GeForce RTX 5070 12GB, 32GB DDR4, SSD M.2 1TB ", price: 4500, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS8t_H0BvRQ3R4Ndr7nH64vv03qus2FsA-waFiMmmY3u6UXEBOr-v0BYx0VeL_6ZGeCVgE3tUb3wLZF9sT-4VRvwbFVh_zMk47RRC40KFPgu7WMzs9diJg8PJ5HXU6_dmg9XPtrAbk-yfo&usqp=CAc" },
       
    ],
    ps5: [
        { id: 201, name: "PS5 Standard Edition", price: 3600, img: "data:image/webp;base64,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" },
        { id: 202, name: "PS5 Digital Edition", price: 3120, img: "data:image/webp;base64,UklGRnASAABXRUJQVlA4IGQSAABwVACdASq1AA8BPj0cjEQiIaERSgW8IAPEs7d4mBDkuH9lnEYKh+GseCyNolP5b/kvUj+wHradEB1NnPt+0P+1vpb6ox2H7if9/4n+UT0d7ec6eJZ8u+/H5n+5/uT8cO03456hHsb++fkt+Yfun7eOw3oEeu/1T/Ufml/ffhc+382/rx/wfyd+gD+T/zX/PeVd4p/2b/VewH/Jf6r/qv8Z+Ufybf7n+d/M73tfR//W/y/wHfzb+p/7X/Bfu9/hP//4nv3D9kX9finCyKZVYKh1+5ms84upMQ9JqFkUyiqHqwrjDPI38thuv4YyP6EiaB07muALehogwiKe99++s8YqJ9ndE6hl6GbfxcBgerIwZ/0Z5Hq7C5fR8i2OYcpJS5uun0vGeV+K11qxm5n/ydI/pkoCuAks7dR9E1FIG60UPkvsLTQRsAp+bgQ12kNmea6R495lePmK12Atl6BxKv42riRVARsCKfn7l3IGWMcgsSAdQUbvsGma8BkkH4DIPm5HzM7fuWRnI3g3e53CeAodTjFak5Bl7NH75x9NGFG63PTwYboiB/rNHKkiW7VM0XJX/byOYSan3CI+yDquo7uyNZYWc7ETPeCyhnvjMkr2IhRC8f2XCiMqdcMQOrh7zjexu6WTIVZy26AyvO4U4g0BAOdVVNMbXOhmgrQn/YoQmz6cFXo1d6aUXf0MzoqarBNLzzjgGCtJdi35++Zmyx9IobiItNnPeF0P7wEQBYFScQMmMbqzFH/rr82R6AFaTbogSciKvYRnLd0H0LWxD6er3Qid0d3GtwQPopzEN2OqKSHM/LuBQ4Yhjn5h28rhWfxe0S8b7jSX2tLg2JsPwan5kQPKX1OHnnWJDW8nnFYGhb3FET7+MHzXsFQ6/czWecXUmIek1CyKZVYKhIAA/v4kYAAAAAAAItmElCZ80GBcE6TQW4nWPhWgQ/NrSh4p6FqUZajg6JsrCIs0McHqH513+tuKlcWy0kEE1ZmNvktxQpV/FGSelV4Tw6K0VsKEsV9G7JcFXbMx30BKvH/f9Km0k9zWkFNn1J8DTvDJCiaVymEoMQ6n2vIysravFaO+4XjoTJN4v7fg09u7AV7nqlwYZPjN7S52+aKGbdzSdiMSCUZajiA119IT1Y5X8TsKHFKcGT7Ykj3P3abGvIwAjwNRElvE8FeIK3mwJaMNP8jpdxyKXmY1IHiUnCmV0aoz2T9uHM8R8KX7ptmFvjVHyBWcqvNfiCBYRVMND5vcI/i3ga7jvJhUr5AmAiu88wrF+HAfEF1t7Ile5wQq/2SY/Kwvp/Jr/wO4YbiegfI6trIVdQBqvF0l72IOl0udE3VMcnBIEi7rtVBv3jTP9jqAu0xMMH5/+S++u65i2kWwr6fZ6c3l/uEbucahe6h/+AiHaM6dD0TXJiRlyeg/2xi07bPLRnmj1CdNAvoe/O3G7bB4Pw7VsJUp+W/ezxz4f4A6Au17trrPtyyr1mCQbkfowYMQwUSOUtknJcwEKp60PCUOfTjlNoBAU23OfmJCMfIz7l567X5GEgrWWLleDllNrocPanj6+u3yZlXcMuLwG2FkWH/cTiF0JUZuMvvgL3NUa7r7V5XCausk7ecNJUWeKB5x73I2k6F4KQwurfrL/9UKL9Z6g3y9Rssf795fnnKOe6OJLEvzApTNYHU9MILvHIb9JxZWYdRDeizIeTswdjqq1EDqHoh6PaxBOl3FQLR/ujn/s5YRO2QGuGyQOhfHNy991VqpNhRaF4MHqBRBe69VSTBrSPeuGJ5ijr5f1d39DI/crz2H3f9nqJBxigfvDBfC4+TGkvgogikG5sbYrNXNMQ/tCoPjEP6VfNIYbjfj/RayDVohfS6lQK5KtpWvuiJMipxsjknDas0BMpHjNNjcdwqkPcFQYytcrbryCx8ePeWZmaUF6bBWf7OvJfnZf3hjtBHO/8ytQWv+ibQXvjfRjpG5HnHCMo+6ABNIPcOG39uH25tnexRGNpdAcOb/GIEmUb5d03dys8rDZeDmijrtMlVw+da/Q86GSbHMou08a4ulT5ZOddu7kccxy98olsN/Ix+fyhp3rAmpVAOf7GyGVjcvxmpC8zqvdPjQawnJh1xb9BQ1wKyF2QKOEZrK8+br9rrcJZtuire8n6v/5sXFDNBXe+AOjp2FBfHMjnA1IZrLU2einyapn0j4Ltgl9ba9ErMpg5NzABbsqEaAvDqfVGhEN9fzHm4J5yEysN8z6L1uExgmksGiNb0yclIZi+md1cRWDaPn9H2QId3gzIXAtxUaacYoMWgYVh9Zq27KdRTR8QODBkGmdu9GB7HRgUSHq+/vD2ZTjapZgK16Lh3/5rWPlcpWXCIhekrVSKAYBGcMQ2lohG9RxSNhfX55irx58yK4Uf4xEKZqPixBiIkP/yiGCmIUbPZ5+Bi3I2tocuVZ175piEk8oXsN1kr3EXJ4TVn7mU04QYz1AJ4fu+DMoHdgcrVi+09vbt/5E0qPWMdH2JJBdv6a39ZIstC1/ifscjjkWY7boNgAJ665Q1Z9/0n8Xx8hJe1ZALoeGfdYnom3xo48ypRUq+1rNdIyY50vcJkmMUHIN6VOd4XZ7vaAliYX3JZ9NIHhSy58nVMHDK/oqCjMmqiTSm/Q7CymLXz1FGXMECH7hi/y5Z9WsNUdi1EP4WVp2bMLBLXLC6z5KV1V7TuzI02PDKn81qZ0FOcUOc+1nTB3Ayi4yvcWeeIlr3rlUWZ2D5q3t1EabEhAeQabLQnOfWWiurAPNo4yieNxMC2MHiDgJxaYXBw/D6+6nkNjvVVJeKKbx0Zi4SFQhHLSd5e3FBdX6kdMN48if/AIxSfGLSik18EllFbzY6i1KpHYc2FjafVIYNjFtr37HwIqHpQZc6JbbvAOa1Rlzo9c+Wa4JruWvBDGSbBwPoAySItG30bnN30BeRbJA1EPVsPOGj6qUe8OqmrYzdoYtTndHyzJ9xauoWC5jaKv5JU9u1jw3OxaJPTcOZzg/LyZP+j0p+fh45UHPEe7Omkfap1ibQLCdtULWeYudqIiEdlV0C4Rga+yDCJkkeGoE92vVT2Vy45BpiMZWn6/JBm1/fjCsFfgs/v++LWizmisK1bJd+PLL2+uQNTMu19tE23AOEYmgO/YzAW9GKTDoAPd/j0fMI5T64g8BsEF04p9Zw4erHfIDr0E4YfX8gPymrShh3cfaHo+5cw0A+3ldZIRf7C6U6CCdXiKeYEzgrbPtL84Mj8UMU9oP5TRGIRtI2ZzaI33l6ZdXngItRpr0l86IYM1WAGndwUcHs1CRMg+odZ6Kp1oi4CBkjbGiDjgTJkdE/80WAUvw6ua8RwzbhXmypOmf3/bb20TZ1kNWK8pOzC1g9a0B82TE4NB6lH6rPk9lbV9g/EY6Rdm+j9+6/2gW9AvEJXpNVA/SAgBE/VUIxWpdc4DLE6fu4CvSdmtY5rpfl2GM+yxUCgif1tUF+H1dB7Pcnbi8fUtEkQwg3wzx8mVG58Ih9DX+Ux/gwxCOymQjrNrCu1WBNqeahH1XcxGFw8uqZZ2owpRNOzWine7oIMTjlpq0VVlS31zg7vzCsOOC0Ep0IXZZzif/NPgNHyxLrOr4wa/VBImO/5LfvWDl1xp1u7IUsMwDlFtFonfHYAtwWa1ilDS5xWIXXmWn5/r7RSNs7sbFdTwn+jdbtHatruEyJpjNSVBjmzAU9lXsgRXLuRiqALLErP0KNzWl/zDClyv4WCYgWF44U6qSF1bDDIJDZzOb/dVKgaB+H9IzP78RsN0aa5oR4hTWV7nxa21IiA4RwXTFjIjp+sQcyJVfWrIgSZlbgQHqpAzxk1t7riEobnlD+pwKcFjh21bPdT7ZLRi70NDkCpZnrgkpB/BxX5NNVNTf8zwsuozpT51eKVaQxp18mYwtpOnk3CNX6rTIXL1gKZvaZnPLaMDQ+Em3PYrycodx4O262h+r+ggWhad1AVUq4fowcpVYU8dvRCux1vHTwzEwzOk85nX21akzlncDlW70PCmUGGDUb/8U0O0wcz/IC8xDsv9SQfOdCcKEpZcbR5lsdiYPt4sekKviBq2wL1wu9mgE65corvRF9nhEL9+TnrbDI2t1N0U5Psi9g+N0eGkKlq6cpMrXDq1Wc9soj5F4/Ywp8mWGZ5IiCVGOexyDOl8Q28J3nJDtJepx/XV13yZYY+F9yxpAPfwe8Qz49V7zdbmXDyi4gFV4zFtsfp9u7kUfgl7/YeOJCFk4UGv5dluh7exXy8tOS4Yf42JhJiLVc3JPuqjsRKUPhzR44mtImqp/pnoC2ei32EO7TA3diCOJnrxeas+FoRSGLD2fBhe3J0kZFCLeju3zRIeSNbKwlO3uxcQBs9Hy16YffEXp5TfBOofxXkLX6lJnfd32TNyMZI+9bf6V8+fMlD1oeJIH2BT/uXxN5X6M3rPl3Up6/wt6dLXlLAJorJQEHbu6IW8SQ3RTzISRAXaXV+Zku/3SayBNL73urjWy7X46oJ+nOjNWrvyxfyJLQ4wEJURMyASj+8fXEtZh3+ZNUtPNq2FwLJqV1yOb1swswfcgdZtBhNcoYJR9EWIA/waW8LEd56xSS+F8ScvLrFT/YhAecfn4YDMFuE8P8fio15s1Pp/SRXQdcmxXE/Gxp/mPabCu+gRfQOOyK2quE1xY91rnt+GUghGbv3P0VIJBbfJPnLEaqQyLxsQgczGxpur1gQMu9pc5mYR0X2JPPKTOMFi0wNJ/8a1E68d/6fIbO0/AQLftk2dhga2IErWTAicGfofXlDtOiL/H8PBvax88T6CxHDXF/OzspZqsRtrODv8xPUXyHayK6w1oIiMrXicd92tzUgq2gqL+zlwZ+veWzWKXMKfSO8VwnLqqDJ7CBoHy23kWwNyL8/g96dLvDNbDYfsoq8aHL3nIxLujB+fFLGtw1t40Q8GSvHa2+hRdY9f1yMHRY54uRREB2S717g1zqBpBjvtzArLJ3XMpKhnn/uz3xz5I9ozLjmPtwivTk6pFW+qNjBcGxE3+0iti80RRqDe7EduWi1cmmINbMRNB53Xpn/8AwCKOhGO6S4dLfXLpplpMGApzmkn100ncXhl2Yy83Fh0FOK6LISHzAKbV2ebmCyyd2xzatNr9yUoRzNsirhGrEx/OXr9BvwZfAL982K2TZK09Z4Y1sQcrPqsC1jtmjpRB8SYNw4AkyLJs5H48Ab+ntZkMAsFLEhW+sG5A9zXh2MPiHlURyU2+udIG/eL2pqJJGZRTmyeM36coSKpZvMOiz8f3rV6HwQO8wzF0LM7+DDLetDzya0Aug3VQmj87F6nXO5fif9JTmE6+/7hvk1xQcTViIhNiSxAYEZP+rdOSLgIEw5AeVjSoRMXiw8iPZGjoWxfw6a5BMztQWQMuEdHVZzx7B6rWq8/JvzB495ABeS+3tt9XzPKcHvzdJjU9eXCoHi4HPuu2/D1vBvzOslJ1fzTDmzPV0Ntd0kYWAxsw+rpgcykWgX9CUEJp/y6C2uvZZkM93bF/SEvJEL6HiQ8equXNv7yR3gbWNOmXa1uWF7TwE5T1dqEqpW2PuVlp5xRk6Dii5VdsAdjM+aVgnMR19QuDFmFmUwKvhbkhYcZEsVKwzRQTtVV9d/3Ds7Vd9UVPLLpxe/3bUaA9Gmn5s9j/ENnprLf+eMV2aW9UXmp1P1NKPDMDrs61raHWtIdUxEda78toY32aIakoaCRh22sIM3RIIUVD8m2eB4EFLDI4/OmeJpxYmWUARaEqagj1/1bDRPldmgFpz5SiCL8/VVqTwytXbDLiL6Eb8A1gom+i6SfsIvBiEjlEFlDRlCrz8j/QeM1HkNkjVnTUmaTTn6QFlsnoKaAc4zG8Q3SM/yq5f22IJCRRKurYRmg0+vtjx6b0GzQQtH/ZUCevUwMWy+2TAyYzJwDc1ivd5J2uEOG7yr6FGaL+/NPhDso7kPiq47YDCjhZIg9+8H20r58Amuz05Hf/Wku7dJAvW7tHbCu+BpcFMGS9P0Sn6kh2Q90duNvxKQRFi6U211Va1JMZVzbab8JSQ0i+HvH5KGrda1v0Cx5G7aKoAhih8Umk6dznrMiSC+Pcxm45Wi5cWdknGLAd8glEw7TVYQGn4nJs1P/Hb51TCOt2QQzgStmooaFvcP8aZgHojMn0f43x04u7ArBSgJa3q3TYffE01K5G/FMSPI4qnHOHjpRCYrrtvvhoYgCv9DZUQYSm+kyLJeqW64xTYOWHHvLBNMQ/U8TLB0MKPBobyrVnIyJ+3hiwAAAAAAAAAAA" },
        { id: 203, name: "DualSense Branco", price: 400, img: "data:image/webp;base64,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" },
        { id: 204, name: "DualSense Midnight", price: 400, img: "data:image/webp;base64,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" },
        { id: 205, name: "Headset Pulse 3D", price: 900 ,    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTDXbzIv8jpf8xNScW8IWhQxulRINHuqHfWOmy4eVVhDCmeiUT8C_AGKv2l0UVEoxMtBCSZY-q5XodAbfu218q9tpcCl5PUl9CW1sVt35js1o7ZEODwLHBy" },
        { id: 206, name: "HD Externo 2TB PS5", price: 650, img: "data:image/webp;base64,UklGRsoCAABXRUJQVlA4IL4CAABQGwCdASqOAI4APj0aiUOiIaEV5NwgA8S0gdgBC/9zrGABoOZkCWAX7hAZX5Scw46+HGIuoNnPn1LEjCxWq5shx6mDAQNNABBj/WNzkF4xgIqeWblAs0gJM8yA84b2/grJO6FFsu9QL+yEDqWkbMGi5XLppzyx9c2i3qk1fh3T5HnbtVOHCqIe/jlo0o3UC7DQeBAUIKUSzNH2rMt/BjpDE1MPDewukipwBI6bUpWDfTnaR4Fo1TcHwj6LixWqheX2pSlA1Y5vs49ZlNacrNMt3cWdFutDeNMAUtU0+rNlgYczAAD+/YD6bU9UuIVjd0/QZy13N+psLf84j3ULg+CJl4b9nU2iEV5NBAgKwTv3dSveTjDU0c4mGsXV/hoQ0O9p8hwFHJ9rZB+1ktljI/N4e6tii+th3gjX44WfT5+fUwrvVe6I5HI0srgUvW1HMJNb2qQC3nD5syO8EbX9EerZ41piPmY1OC1MnSXIbsR052AarvWTmZH3+YRrrbS8LaljfdV3zydIM+SLCyvcVOCH4H4RmetNDDfKhTi5zhAZZhgj1cikHCGZ1sO6DYYlqAfnNzarM5ijc+hQWytieBH+vXxGWkaFaF91BJEL0CQMEaWHZOKD4uaefhmCWnUeW146CEEqjXBmTGYRc+M90d2mlsjPp9QyvIv9nvCUT7CKl9h1iLo6GI7gDRaRcxYsjQbDx5IQdfRoFKaKnwD27GULjTBaingl3f57A9YQXVrXKqUMQVSJI4WhnIyId+GLlJR3XodNN1GkGsk8szAvzwgsQbjTcciA8p0i14mS41HlF8dFcbhl/iiB/kKLSrRciCFYBgimsWwpv+GqRPqtmg30h5aIlk9f1qAdRsQ9ko4SmLIaB4lQjYaM5wbs9dZzc4+adwNSe6if3XjtlZzbjncJ9aMlYvs3gG4A5BQAAAA=" },
        { id: 207, name: "Controle Edge Pro", price: 1500,img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTIW8bl0fTcuZlpeufpyntC3IwABP5qaGPOPceLrWiLsUvAfKfo5nOkD1NOTUGifs5bKIX96ptGgY5CGqR3ufsaiF2ETJMtyIN3JxYqfku1P2XooaoW6tQ6Gg" },
       { id: 208, name: "Base Carregadora", price: 50,img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTmx_3RI9JXbcqkAYJg7rtllGCxx498-nq-Urb79TeoEJL2l6VC408bXcQPvDVPjsekfL0sJvEn_KfKOaTIvfAtbbshvAWp3W764PxOuDeWktVsFCGumVpHAA" },
       
        
        
        { id: 213, name: "Capas PS5 Vermelha", price: 500, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT5JNWWp-0UVq3e7Y8tptg6XS4EYQ3CvsEN-Q0Hb15Qx1FU-jHThKE3REBfxNhYx_TOwsODdpPvvBb1nSCCS1Pr3TnEq-qcxaH64efZ4EiQEnv51Gpa7fk31w" },
        { id: 214, name: "Controle Cobalt Blue", price: 500, img: "data:image/webp;base64,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" }, 
        { id: 215, name: "Suporte Vertical RGB", price: 200, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRD67hmIZgGww5K6IEMkntZ8WL6vB0p-QKLYG59GZIsJdQz45uvcu1vssNMGr1gZU1njW8RWMkMz3u0ItIama_5MStppxbe7Jm4uiqnADdOCDqej6uQXeSbH28" },
     
        { id: 219, name: "SSD NVMe 1TB PS5", price: 890, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTiCYoJ-ujfet0EJ4BU6DtnjfOIlZhG5BDFt4HVhzkTuZ215auudj-hKIoLSHmohQ4RAxujykMOwb4G2iCAvmk1yimbW27G1QtLtS0ylgpCH-NDu597J2xyTA" },
        { id: 220, name: "PS VR2 Headset", price: 2500, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRJaNtSQCmPMMBaOa0gHXar-wuGMjh89qBQVu-wSYwtq62WvOTkUdkYQ8N9pCTdfy2rrwNEUBOaRz2lp9ixTpSSoyYaReOZNi9iSTHXiE5nTO-qt1wtKeN4" },
    ],
    perifericos: [
        { id: 301, name: "Teclado Razer BlackWidow", price: 1771, img: "https://images.kabum.com.br/produtos/fotos/581214/razer-blackwidow-v4-75-hot-swappable-mechanical-gaming-keyboard-us-nasa-rz0305000200-_1724255434_gg.jpg" },
        { id: 302, name: "Mouse Logitech G502", price: 849, img: "https://media.pichau.com.br/media/catalog/product/cache/2f958555330323e505eba7ce930bdf27/9/1/910-0061703.jpg" },
        { id: 303, name: "Mousepad Nexus XXL", price: 30, img: "https://cdn.shopify.com/s/files/1/0634/2357/8290/files/WhiteNexus1.jpg?v=1708190547" },
        { id: 304, name: "Headset HyperX Cloud II", price: 369, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSutbK7BsWCASVdNmYtsF1NubOsYCFgA001_kCJc34bL7Id08Q-xCMWJZwyLk5rjZQiBqcOGE__mrsoocJGWXM6J1XxAqKEK-KBFz4dWqe7nF2x69BNyvwkAx3TGajxxEIfdFClcsI9qVQ&usqp=CAc" },
        { id: 305, name: "Monitor Alienware 360Hz", price: 4000, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcT9wGU_8BDHIpWwl05qw-yaHALIfq3AJejyyUUot6gTygLSGQaDt2fA3_JzgrN6nuKMDKg_DAYu9VIPQKz1cvaI41kqwm1nDVEY4IuQ4lu_xPCv4j7UiNcdM27u&usqp=CAc" },
        { id: 306, name: "Cadeira Gamer Pichau Siriun, Braco 4D, Preto, PG-SRN-BK", price: 800, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSlAJPV47qVPu6SDOsdGauxlHewDZoYVV_nyvIcnfh_wWqKYCuNJ-vUimfvmvnEbn41wYIqMnEcrlF8FCTjmFCg5xpVXHrsyTFABnLajGPTs7QRr_OoMb62GiQGqBIwC_P40tVn9w&usqp=CAc" },
        { id: 307, name: "Microfone Shure SM7B", price: 3000, img: "data:image/webp;base64,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" },
        { id: 308, name: "Webcam Logitech C922", price: 330, img: "data:image/webp;base64,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" },
        { id: 309, name: "Stream Deck MK.2", price: 770, img: "data:image/webp;base64,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" },
        { id: 310, name: "Suporte Articulado", price: 200, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4KzX0eA83Hp_tOuESYdaC3cC5Oy-6r-mMaR4C8vEBQ89ntPcX_OuOZi1uAcaR-cP29JuY21nUeJc7kJ9Lkt8T7fxBzzk1U4DBqfiSffcMv1WDbK8jExoA-ez5U6QVWvTzQwODZ2YDqA&usqp=CAc  " },
        { id: 311, name: "Iluminação Ring Light", price: 190, img: "data:image/webp;base64,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 " },
        { id: 312, name: "Braço p/ Microfone", price: 300, img: "data:image/webp;base64,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" },
        { id: 313, name: "Caixa de Som Edifier", price: 580, img: "data:image/webp;base64,UklGRk4HAABXRUJQVlA4IEIHAABQMQCdASq1AMUAPj0ci0QiIaEU2eSoIAPEtLdhKAdBWMvmEI7mf4Ts++0jGfWm/Rv91+TvNBxydx/0U3+Z50vqj/o+rX/yOw4M3M9ZZnrLM9ZZnrLM9ZY66nSIWqXF6V2BR9E1TlE/sVKHk0D87tuchJy1X/BBDoQAlv4J7UfqOUsfhbCdXcdY0uQH3Y4Y0nVxgXePrKEzcTaRyYH1g6S4476xNTb2K7VRevE3Ij/VniS6QEZ/kndMSxBx7Svkf7ZpYHpnCnzO88k5ONzpU9RWcThxT9BL1JCmDPkfW6ajoVyHGkdNvKg9WeGMMWuucsSQUAOan/fD/AA/bCZic4ehSOPlubPafVqyxYn6Ud1zfrG5xAdNRRCpEgUsenma6agbvrmC/eNBdwa0iTAWGp3c1xBskMb+UEyNGo3X39R0IuP1eDL0PSYoK479PJ/9aTB3dFs4UzRtqX+5HdNdoEDmrQF4QZ2WV6KJV0Xb1XEYcOZQf7PSpKgriKvfy85qOs8q5N+xkOsn3rLM9ZZnrLM9ZYIAAP7iVQAAAAABXhjppHJ6GOlB5/uImcO4GQkWFRqbDp4KVaZ+8QBkTkP3P6xjaxlMkh/4qhW7gJ9+rkNZtrMFm0JsH9GUAldYRmSSsVv+aZJrKWr5SuzP5rJxul0dtiyaHsOdneMmN8MAxuO8sfEbLq6+Vumr/5nrQ11WzZn7dfhOHltlUagon4rjegrefAtfEGD2oWMnXE7a3orDG/au4+Hfb58igrSbY6zO/bnM8jWuRkEa1K8yxfze4yL1KZ8yZU2bJcV7D2RD/bqtdMUAlA3DmaWYtZiQkCr7r/vGdOhFTY+b4AGEf8gMecI4xZYZnpKnkIa2chVSHm5sQPzyc/SM6LT19rdhPgHeWre6ZEFU2uIZ/fw1Sf0ivwRFKab+L3FvT4p3cghUn6YVXU9znGZ8ifw75/GulsjbLvYkc3f/R/nMqR/4Nf/0pGEcLbdleomM6FS9hreztjUBhYbTDIOha0dF3UucnYdA5jnX/tzZjybnRUlJcvIdANum4NQtU2iBnDFFNvmd+WSztj7jBg+tvcyuQXNcOs8AWOCJ3XxbDeba6BPDfCLv6YPVBLCx6cv32XymoRZ5+7NdsjdpX2NPF2oShlXUTUUFYpEjMdukPtPzZLIjxTXg93/OqEqFWjC9Hilq3aotgRKsGBrTFA+w65R7zrBBx2ciJXALzq1EegZew0qZeZoTyN9bfmlX4GwhGCUeEByc+JWutGh22zc63IK514O81ufXwEFWt1KQdanwm18/ivW37uzMJK/KGpcBm2klggC0dMv2Db54RybsQR+PxSKxVTDaP/kOLPwdNUn3yow4yklqmay3K7B2uSBUnEZAsJQW6X1HyRvoqSr2DN74TUEzrfX4Ifma5lFfPtdpaQ88OKd0uQg96L7YpLK86iDz2A6Q/boQuw0qerWJYssGGC3S4Q7ow0GT9LgR0V58B7rwkLPRsEx5YH+g6O/uwpNOvoGhh90U7ftugC1jSF5fFrpouFnaF91ywrHkSIAR1byeINYZqeDrROpDye50K0DjAjQl6qMvVNyQtxViJz/dRnB21PslJuKSEoBFNkM/2b1lyqumLxkz+4m9PyLHLF9EvBIWw2Rjh63jxvUunltI4+YIgAoLuKXQrUo0HD+SB6anJ5sKCuJVpqchciGFzrI6vsESEV/44hDhp47PebZC5wutgqDtt1eUEwcvixytvzEzsXMFIymD8A5aF3exH3eYnRiFu5MK/rCmtFXPXgv8vsrYEYPaTarQ6FIH5HVPBqtm8v5D9SqIRvXOC1Kg2DJGfjX48oMXLTIrfoycpodyz4bgQzA7+xD/P0mQ/f17rnJgwIRcGqofasN7nCs5R+S/9cyA1Y2l/gjlM+YOkIi9JAv/dr8OT6Ivz+tlsAwm3pkvNaLFDVZzWGJlEyeX4AxKQsHMRvMuIj+TcmfkApL80p/FhTFz3DWiZ7SwmWziX+ZEd41d2IzwQ/9M9vs/Fn6LazKz4PgHTHjSrIKL1PqpYTo141SCRLRjI8LYooQZj4JlEFYAjXShkaPcCTvUOXzgRKYnsXbyjQ/X39ZK7/Y/9IMzPJBsgZPjA6wGCkJBtQNbAVGQsKPlxOQndH4scQ6dcI6JTIvz0U6qvBwC9RE6g0+U6JeLcTQq3We7Jj7+CiJ+pW3v0jz1NPd7Z9YbvvPzhTmzjXmU6vFIAoG+oFgkSYBV2fHB58LIqi1Xmtz/0m6Xk3KvKnoqrXNscff7hXw+kcZOqC3aV5E4d6n0ylcQnKwB2ESTMfBqBmOnlAr/fYnEChVtKf7gKCXqIYSMEqaEmAwtD/QlRRQEMTxx//cX0txSeGfbsHT2jPL1uPjRb7y8MPm3/+tY9cJd1HlbsiHxwyIaVCs2DKllvGj875l7j6A4ezNTtN5O7MtbITJqzggh9V5PEhMzFHBRYb5UIDIEAAAAAAAAAAAA" },
        { id: 314, name: "Hub Usb Com 7 Portas Ultra Rápido Para Pen Drive E Hd 3.0 5Gbps Alta Velocidade De Dados Turbo Usb Marca Ex Decor", price: 30, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSdsqR58xzlswo7apo1SynOCgjZyt3iZjQGQ9cmlsc-8xtPbgUdYfgH39aHFwQn4Glk6ddkRw3V84UUN4I1bBC_WQKTOu3dWxbiUOga5qFAtdKz1tyTEs_VsPXRTg2U&usqp=CAc" },
        { id: 315, name: "Cabo HDMI 2.1 3m", price: 30, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSfqw4mMULNnupbZqb_OpGBDGRq6sfaozpijrXmhgesQWb4oM2U4DtVC1X4eKvX89eQsEeDFyng3UJghoU-Cj_qJHgbYgjdSkWgnLyS1apjBlFcPUot0ZrSnsNzScswVDEXlNGIHOV0qw&usqp=CAc" },
        { id: 316, name: "Controle p/ PC Xbox sem fio"  , price: 380, img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTJehC_hcu4xPyOdapP1lL24_Y_ph-nOPvnKkBNFPkwGtEyLAnfv5IxVMC8onJmlXkxTVAyF4rYc3RCrqQFkxCfjJn1Qw5ZgA3RUIzpOMWTZE6ynqM100M8ZT4EfCs1A9tiLma3zWrvZg&usqp=CAc" },
        { id: 317, name: "Cooler p/ Notebook", price: 60, img: "data:image/webp;base64,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" },
        { id: 318, name: "Roteador Gaming WiFi 6", price: 400, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTGxHBbiWd9MWps6yInRQtM4J0TYIxKn8xaYYrrQ278VvfwMaTu06NRhzA5Siyj0ptEPOWkJrJXbCXd-h3F0MLJ8mNCrO0spQIHt_Y8udXW-cpvUBPdlf8GUb6_-FimvIPIraM4SzPePOg&usqp=CAc" },
        { id: 319, name: "Óculos Gamer Anti Luz Azul Anti Fadiga Visual Envio Em 24h", price: 100, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ88oGQ0Se8Wmt0q643jmJp2S7Z7WcX7NL76l0E-3e_lFhUGaYohgyJq6d3mIDvxD7SKzi97IM4S8GEWxYezh8-XOnv0BIDfONZ3ejHtkb-q4sxXNltEO3M_jqAuwx9NSXl8JoJJHprYA&usqp=CAc" },
        { id: 320, name: "Kit Limpeza Periféricos", price: 40, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR0J-k7NZ4DUes2Qy0AA1gPheoBOSCCcwRP6Dln2SUp0CbcPduNGo5y9xPjjkNtXZQaiuk0xceMCfwvKhRbw43-w4NVB6MEQwpE9SKQF79HG1JiW08tKgVFSAsK-hNoNLRgZ87xW6VbmdI&usqp=CAc" }
    ]
};

// NAVEGAÇÃO
function showTab(tabId, saveHistory = true) {
    if (saveHistory) {
        historyStack.push(tabId);
        try { history.pushState({ tab: tabId }, '', '#' + tabId); } catch (e) {}
    }
    const app = document.getElementById('app');
    app.style.display = 'block';
    try { localStorage.setItem('nexus_current_tab', tabId); } catch (e) {}

    let content = '';
    if (tabId !== 'home') content = `<button class="back-btn" onclick="goBack()">< Voltar</button>`;
    if(tabId === 'home') {
        content += `<h1>NEXUS GAMING HUB</h1><p>CEO: Gabriel Defreyn</p>
            <div class="grid"><div class="card" onclick="showTab('pc')"><h2>PC GAMING</h2></div>
            <div class="card" onclick="showTab('ps5')"><h2>PS5 GEAR</h2></div>
            <div class="card" onclick="showTab('perifericos')"><h2>EQUIPAMENTOS</h2></div></div>`;
    } else if(tabId === 'staff') {
        content += `<h1>EQUIPE NEXUS (${staffMembers.length})</h1><div class="grid">`;
        staffMembers.forEach((m, i) => {
            let specialClass = '';
            if (m.name === "Yasmin Morais de Souza") specialClass = ' yasmin-highlight';
            if (m.name === "Gabriel Defreyn") specialClass = ' gabriel-highlight';
            if (m.name === "Luis Alberto Otto") specialClass = ' yasmin-highlight';
            content += `<div class="card staff-card${specialClass}">` +
                       `<div class="staff-flag">${m.flag}</div>` +
                       `<h4>${m.name}</h4>` +
                       `<p style="color:#00f2ff">${m.role}</p>` +
                       `<p style="font-size:0.75rem;opacity:0.7">${m.country}</p>` +
                       `<p style="font-size:0.7rem;opacity:0.5">ID: #00${i+1}</p>` +
                       `</div>`;
        });
        content += `</div>`;
    } else {
        if (tabId === 'painel') {
            content += `
                <h1>Painel & Leaderboard</h1>
                <div class="panel">
                    <div class="game-card card">
                        <h3>Clicker Challenge</h3>
                        <p>Clique o máximo de vezes que conseguir em <span id="timer-display">15</span>s</p>
                        <div class="score-row">
                            <div class="big-score">Pontos: <span id="game-score">0</span></div>
                        </div>
                        <button id="start-btn" class="btn-buy" onclick="startGame()">INICIAR (15s)</button>
                        <button id="click-target" class="score-btn" onclick="clickTarget()" disabled>CLIQUE AQUI</button>
                        <div style="margin-top:12px">
                            <input id="player-name" placeholder="Seu nome (para leaderboard)" />
                            <button class="btn-buy" onclick="submitScore()">Enviar pontuação</button>
                            <button class="btn-buy" style="background:linear-gradient(45deg,#ff0055,#bc13fe); margin-left:8px;" onclick="clearLeaderboard()">Limpar leaderboard</button>
                        </div>
                    </div>
                    <div class="card leaderboard">
                        <h3>Top 10 - Leaderboard</h3>
                        <ol id="leaderboard-list"></ol>
                    </div>
                </div>
            `;
        } else {
            const products = catalog[tabId] || [];
            content += `<h1 style="text-transform:uppercase">${tabId}</h1><div class="grid">`;
            products.forEach(p => {
                content += `<div class="card"><img src="${p.img}"><h3>${p.name}</h3><p class="price">R$ ${p.price}</p><button class="btn-buy" onclick="addToCart(${p.id},'${p.name}',${p.price})">ADICIONAR</button></div>`;
            });
            content += `</div>`;
        }
    }
    app.innerHTML = content;
}


function loadLeaderboard() {
    return JSON.parse(localStorage.getItem('gv_leaderboard') || '[]');
}

function saveLeaderboardEntry(entry) {
    const list = loadLeaderboard();
    list.push(entry);
    list.sort((a,b) => b.score - a.score);
    localStorage.setItem('gv_leaderboard', JSON.stringify(list.slice(0,10)));
}

function renderLeaderboardUI() {
    const list = loadLeaderboard();
    const el = document.getElementById('leaderboard-list');
    if(!el) return;
    el.innerHTML = list.map(item => `<li><strong>${item.name}</strong> — ${item.score} pts <small style="opacity:0.6">(${item.date})</small></li>`).join('');
}

let gameState = { score:0, timeLeft:15, running:false, timerId:null };

function startGame() {
    const startBtn = document.getElementById('start-btn');
    const target = document.getElementById('click-target');
    gameState.score = 0; gameState.timeLeft = 15; gameState.running = true;
    document.getElementById('game-score').innerText = '0';
    document.getElementById('timer-display').innerText = gameState.timeLeft;
    startBtn.disabled = true; target.disabled = false; target.focus();
    gameState.timerId = setInterval(() => {
        gameState.timeLeft -= 1;
        document.getElementById('timer-display').innerText = gameState.timeLeft;
        if (gameState.timeLeft <= 0) endGame();
    }, 1000);
    renderLeaderboardUI();
}

function clickTarget() {
    if(!gameState.running) return;
    gameState.score += 1;
    document.getElementById('game-score').innerText = gameState.score;
}

function endGame() {
    clearInterval(gameState.timerId); gameState.running = false;
    document.getElementById('start-btn').disabled = false;
    document.getElementById('click-target').disabled = true;
    showNotification(`Tempo esgotado! Você fez ${gameState.score} pontos.`);
}

function submitScore() {
    const nameInput = document.getElementById('player-name');
    const name = (nameInput && nameInput.value.trim()) || 'Anônimo';
    const score = gameState.score || 0;
    saveLeaderboardEntry({ name, score, date: new Date().toLocaleDateString() });
    renderLeaderboardUI();
    showNotification('Pontuação enviada ao leaderboard!');
}

function clearLeaderboard() {
    if(!confirm('Limpar leaderboard local?')) return;
    localStorage.removeItem('gv_leaderboard');
    renderLeaderboardUI();
    showNotification('Leaderboard limpo.');
}

function goBack() {
    try { history.back(); } catch (e) {
        if (historyStack.length > 1) { historyStack.pop(); showTab(historyStack[historyStack.length-1], false); }
    }
}


window.addEventListener('popstate', (e) => {
    const tab = (e.state && e.state.tab) || (location.hash ? location.hash.replace('#', '') : (localStorage.getItem('nexus_current_tab') || 'home'));
    showTab(tab, false);
});


window.addEventListener('load', () => {
    const initial = (history.state && history.state.tab) || (location.hash ? location.hash.replace('#', '') : (localStorage.getItem('nexus_current_tab') || 'home'));
    showTab(initial, false);
});


function toggleMenu() {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('nav-open');
}


function openCheckout() {
    if (cart.length === 0) return showNotification("Carrinho vazio!", true);
    toggleCart(); 
    document.getElementById('checkout-modal').classList.add('modal-active');
    updatePaymentDetails();
}

function closeCheckout() { document.getElementById('checkout-modal').classList.remove('modal-active'); }

function updatePaymentDetails() {
    const method = document.getElementById('pay-method').value;
    const infoDiv = document.getElementById('payment-info');
    const finalPriceDisplay = document.getElementById('final-price-display');
    let total = 0; cart.forEach(item => total += item.price);

    if (method === 'pix') {
        const totalPix = total * 0.95;
        infoDiv.innerHTML = `<p style="color:#00ff88;">✓ 5% de Desconto no PIX!</p>`;
        finalPriceDisplay.innerText = `TOTAL NO PIX: R$ ${totalPix.toFixed(2)}`;
    } else {
        let opts = `<p>Parcelamento:</p><select id="installments" style="width:100%;">`;
        for (let i = 1; i <= 7; i++) {
            opts += `<option>${i}x de R$ ${(total/i).toFixed(2)} (Sem juros)</option>`;
        }
        opts += `</select>`;
        infoDiv.innerHTML = opts;
        finalPriceDisplay.innerText = `TOTAL: R$ ${total}`;
    }
}

function confirmPurchase() {
    const name = document.getElementById('cust-name-check').value;
    const addr = document.getElementById('cust-address').value;
    const city = document.getElementById('cust-city').value;
    const cep = document.getElementById('cust-cep').value;

    if (!name || !addr || !city || !cep) return showNotification("Preencha todos os campos do endereço!", true);

    showNotification(`Pedido confirmado para ${name}!`);
    cart = []; localStorage.removeItem('nexus_cart');
    updateCartUI(); closeCheckout(); showTab('home');
}


function setupRating() {
  
}


function initFirebaseComments() {
    if (typeof firebase === 'undefined' || !firebase || !firebase.database) return;
    try {
        const db = firebase.database();
        fbRef = db.ref('nexus_comments');
        firebaseEnabled = true;

     
        fbRef.on('value', snapshot => {
            const val = snapshot.val() || {};
             const arr = Object.keys(val).map(k => val[k]).sort((a,b) => (b.dateEpoch||0) - (a.dateEpoch||0));
            comments = arr;
            try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
            renderComments();
        });
    } catch (e) {
        console.warn('Firestore init failed', e);
    }
}


function loadRemoteConfig() {
    try {
        const raw = localStorage.getItem('nexus_remote_cfg');
        if (raw) remoteConfig = Object.assign(remoteConfig, JSON.parse(raw));
         const inUrl = document.getElementById('remote-url');
        if (inUrl) inUrl.value = remoteConfig.url || '';
        const hn = document.getElementById('remote-header-name');
        if (hn) hn.value = remoteConfig.headerName || '';
        const hv = document.getElementById('remote-header-value');
        if (hv) hv.value = remoteConfig.headerValue || '';
        const cb = document.getElementById('remote-auto-sync');
        if (cb) cb.checked = !!remoteConfig.autoSync;
    } catch (e) { console.warn('loadRemoteConfig', e); }
}

function saveRemoteConfig() {
    const url = document.getElementById('remote-url').value.trim();
    const headerName = document.getElementById('remote-header-name').value.trim();
    const headerValue = document.getElementById('remote-header-value').value.trim();
    const autoSync = !!document.getElementById('remote-auto-sync').checked;
    remoteConfig = Object.assign(remoteConfig || {}, { url, headerName, headerValue, autoSync });
    try { localStorage.setItem('nexus_remote_cfg', JSON.stringify(remoteConfig)); } catch(e) {}
    showNotification('Configuração remota salva.');
    setupRemoteSync();
}

async function testRemoteSync() {
    const url = document.getElementById('remote-url').value.trim();
    if (!url) return showNotification('Informe a URL primeiro.', true);
    showNotification('Testando conexão...');
    try {
        const headers = { 'Content-Type': 'application/json' };
        if (document.getElementById('remote-header-name').value) {
            headers[document.getElementById('remote-header-name').value] = document.getElementById('remote-header-value').value;
        }
        const res = await fetch(url, { method: 'GET', headers });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        await res.json();
        showNotification('Conexão OK.');
    } catch (err) {
        console.error(err);
        showNotification('Falha ao conectar: ' + (err.message||''), true);
    }
}

async function pullRemoteComments() {
    if (!remoteConfig.url && !remoteConfig.provider) return;
    try {
        let data = null;
        if (remoteConfig.provider === 'jsonbin' && remoteConfig.providerData.binId) {
            const binId = remoteConfig.providerData.binId;
            const headers = {};
            if (remoteConfig.headerName) headers[remoteConfig.headerName] = remoteConfig.headerValue;
            const res = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, { method: 'GET', headers });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const json = await res.json();
            data = json && (json.record || json);
        } else if (remoteConfig.provider === 'getpantry' && remoteConfig.providerData.pantryId && remoteConfig.providerData.basketName) {
            const url = `https://getpantry.cloud/apiv1/pantry/${remoteConfig.providerData.pantryId}/basket/${remoteConfig.providerData.basketName}`;
            const res = await fetch(url, { method: 'GET' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        } else {
            const headers = {};
            if (remoteConfig.headerName) headers[remoteConfig.headerName] = remoteConfig.headerValue;
            const res = await fetch(remoteConfig.url, { method: 'GET', headers });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            data = await res.json();
        }
        if (!Array.isArray(data)) return;
      
        const map = {};
        comments.concat(data).forEach(c => {
            map[c.id] = map[c.id] || c;
            if ((c.dateEpoch||0) > (map[c.id].dateEpoch||0)) map[c.id] = c;
        });
        comments = Object.values(map).sort((a,b) => (b.dateEpoch||0) - (a.dateEpoch||0));
        try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
        renderComments();
    } catch (e) {
        console.warn('pullRemoteComments', e);
    }
}

async function pushRemoteComments() {
    if (!remoteConfig.url && !remoteConfig.provider) return;
    try {
        if (remoteConfig.provider === 'jsonbin' && remoteConfig.providerData.binId) {
            const binId = remoteConfig.providerData.binId;
            const headers = { 'Content-Type': 'application/json' };
            if (remoteConfig.headerName) headers[remoteConfig.headerName] = remoteConfig.headerValue;
          
            await fetch(`https://api.jsonbin.io/v3/b/${binId}`, { method: 'PUT', headers, body: JSON.stringify(comments) });
        } else if (remoteConfig.provider === 'getpantry' && remoteConfig.providerData.pantryId && remoteConfig.providerData.basketName) {
            const url = `https://getpantry.cloud/apiv1/pantry/${remoteConfig.providerData.pantryId}/basket/${remoteConfig.providerData.basketName}`;
            await fetch(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(comments) });
        } else {
            const headers = { 'Content-Type': 'application/json' };
            if (remoteConfig.headerName) headers[remoteConfig.headerName] = remoteConfig.headerValue;
            await fetch(remoteConfig.url, { method: 'PUT', headers, body: JSON.stringify(comments) });
        }
    } catch (e) { console.warn('pushRemoteComments', e); }
}

function setupRemoteSync() {

    if (remoteSyncIntervalId) { clearInterval(remoteSyncIntervalId); remoteSyncIntervalId = null; }
    loadRemoteConfig();
    if (!remoteConfig.url) return;
   
    pullRemoteComments();
    if (remoteConfig.autoSync) {
        remoteSyncIntervalId = setInterval(pullRemoteComments, 5000);
    }
}


function configureJSONBin() {
    const apiKey = prompt('Cole sua API Key do JSONBin (X-Master-Key):');
    if (!apiKey) return showNotification('API Key necessária.', true);
    const binId = prompt('Cole o BIN ID do JSONBin (ex: 615...):');
    if (!binId) return showNotification('BIN ID necessário.', true);
    remoteConfig.provider = 'jsonbin';
    remoteConfig.providerData = { binId };
    remoteConfig.headerName = 'X-Master-Key';
    remoteConfig.headerValue = apiKey;
  
    remoteConfig.url = `https://api.jsonbin.io/v3/b/${binId}`;
    try { localStorage.setItem('nexus_remote_cfg', JSON.stringify(remoteConfig)); } catch(e) {}
    loadRemoteConfig();
    setupRemoteSync();
    showNotification('JSONBin configurado. Teste a conexão.');
}

function configureGetPantry() {
    const pantryId = prompt('Cole o Pantry ID do getpantry (ex: abcdefgh-...):');
    if (!pantryId) return showNotification('Pantry ID necessário.', true);
    const basket = prompt('Nome do basket (ex: comments):', 'comments');
    if (!basket) return showNotification('Nome do basket necessário.', true);
    remoteConfig.provider = 'getpantry';
    remoteConfig.providerData = { pantryId, basketName: basket };
    remoteConfig.url = `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basket}`;
    try { localStorage.setItem('nexus_remote_cfg', JSON.stringify(remoteConfig)); } catch(e) {}
    loadRemoteConfig();
    setupRemoteSync();
    showNotification('getpantry configurado. Teste a conexão.');
}

function saveComment() {
    const name = document.getElementById('comm-name').value;
    const type = document.getElementById('comm-type').value;
    const text = document.getElementById('comm-text').value;
    if(!name || !text) return showNotification("Preencha tudo!", true);

    const id = Date.now().toString();
    const newComment = { id, name, type, text, date: new Date().toLocaleDateString(), dateEpoch: Date.now(), replies: [] };

    if (firebaseEnabled && fbRef) {
        fbRef.child(id).set(newComment).then(() => {
            document.getElementById('comm-name').value = '';
            document.getElementById('comm-text').value = '';
            showNotification("Feedback publicado!");
        }).catch(err => {
            console.error(err);
            showNotification('Erro ao publicar (remote).', true);
        });
    } else {
        comments.unshift(newComment);
        try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
        document.getElementById('comm-name').value = '';
        document.getElementById('comm-text').value = '';
        renderComments();
        showNotification("Feedback publicado!");
    }
}


function deleteComment(id) {
    if(!confirm("Deseja realmente excluir este comentário?")) return;
  
    if (firebaseEnabled && fbRef) {
        fbRef.child(id).remove().then(() => {
            showNotification("Comentário excluído!");
        }).catch(err => {
            console.error(err);
            showNotification('Erro ao excluir (remote).', true);
        });
    } else {
        comments = comments.filter(c => c.id !== id);
        try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
        renderComments();
        showNotification("Comentário excluído!");
    }
}

function renderComments() {
    const display = document.getElementById('comments-display');
    if(!display) return;
    display.innerHTML = comments.map(c => `
        <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:10px; margin-bottom:20px; border-left: 5px solid ${c.type==='reclamacao'?'#ff0055':'#00f2ff'}">
            <div style="display:flex; justify-content:space-between; align-items: flex-start;">
                <div>
                    <strong>${c.name} <small style="opacity:0.5">(${c.date})</small></strong><br>
                    
                </div>
                <button onclick="deleteComment(${c.id})" style="background:none; border:none; color:#ff0055; cursor:pointer; font-size:0.7rem; font-weight:bold;">[EXCLUIR]</button>
            </div>
            <p style="margin:15px 0; color:#ccc;">${c.text}</p>
            <div id="replies-${c.id}">${c.replies.map(r => `<div style="background:rgba(255,255,255,0.03); padding:10px; margin-top:5px; border-radius:5px; border-left:2px solid #555; margin-left:20px;"><strong>${r.name}:</strong> <span>${r.text}</span></div>`).join('')}</div>
            <button onclick="toggleReplyInput(${c.id})" style="background:none; border:none; color:#00f2ff; cursor:pointer; text-decoration:underline; font-size:0.8rem; margin-top:10px;">Responder</button>
            <div id="input-area-${c.id}" style="display:none; margin-top:10px;">
                <input type="text" id="reply-name-${c.id}" placeholder="Seu nome" style="width:30%;">
                <input type="text" id="reply-text-${c.id}" placeholder="Resposta..." style="width:50%;">
                <button class="btn-buy" style="padding:5px 10px;" onclick="addReply(${c.id})">ENVIAR</button>
            </div>
        </div>
    `).join('');
}

function toggleReplyInput(id) {
    const area = document.getElementById(`input-area-${id}`);
    area.style.display = area.style.display === 'block' ? 'none' : 'block';
}

function addReply(commentId) {
    const name = document.getElementById(`reply-name-${commentId}`).value;
    const text = document.getElementById(`reply-text-${commentId}`).value;
    if(!name || !text) return showNotification("Preencha nome e resposta!", true);
    const idx = comments.findIndex(c => c.id === commentId);
    comments[idx].replies.push({ name, text });
    localStorage.setItem('nexus_comments', JSON.stringify(comments));
    renderComments();
    showNotification("Resposta enviada!");
}


function exportComments() {
    try {
        const dataStr = JSON.stringify(comments, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nexus_comments.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        console.error(e);
        showNotification('Erro ao exportar.', true);
    }
}


function handleImportFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const imported = JSON.parse(evt.target.result || '[]');
            importComments(imported);
        } catch (err) {
            console.error(err);
            showNotification('Arquivo inválido.', true);
        }
    };
    reader.readAsText(file);
   
    e.target.value = '';
}


function importComments(importedArray) {
    if (!Array.isArray(importedArray) || importedArray.length === 0) return showNotification('Nenhum comentário no arquivo.', true);
    if (!confirm('Deseja mesclar os comentários importados com os locais? (Clique Cancelar para substituir)')) return replaceComments(importedArray);

    const map = {};
    comments.concat(importedArray).forEach(c => {
        map[c.id] = map[c.id] || c;
    
        if ((c.dateEpoch || 0) > (map[c.id].dateEpoch || 0)) map[c.id] = c;
    });
    comments = Object.values(map).sort((a,b) => (b.dateEpoch||0) - (a.dateEpoch||0));
    try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
    renderComments();
    showNotification('Comentários importados (mesclados).');
}

function replaceComments(importedArray) {
    comments = importedArray.slice().sort((a,b) => (b.dateEpoch||0) - (a.dateEpoch||0));
    try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
    renderComments();
    showNotification('Comentários substituídos pelos importados.');
}

function addToCart(id, name, price) {
    cart.push({id, name, price});
    localStorage.setItem('nexus_cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${name} adicionado!`);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    const totalEl = document.getElementById('cart-total');
    if(!list) return;
    let total = 0;
    list.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `<div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>${item.name}</span><span>R$ ${item.price} <button onclick="removeFromCart(${index})" style="color:#ff0055; background:none; border:none; cursor:pointer;">[X]</button></span></div>`;
    }).join('');
    totalEl.innerText = total;
}

function removeFromCart(index) { cart.splice(index, 1); localStorage.setItem('nexus_cart', JSON.stringify(cart)); updateCartUI(); }
function toggleCart() { document.getElementById('cart-modal').classList.toggle('modal-active'); }

function showNotification(message, isError = false) {
    const toast = document.getElementById('toast-container');
    document.getElementById('toast-message').innerText = message;
    document.getElementById('toast-icon').innerText = isError ? "⚠️" : "✔️";
    isError ? toast.classList.add('error') : toast.classList.remove('error');
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}


const canvas = document.getElementById('matrix');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let fontSize = 16;
    let columns = 0;
    let drops = [];
    const letters = "NEXUS01";
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fontSize = Math.max(12, Math.floor(window.innerWidth / 80));
        columns = Math.floor(canvas.width / fontSize) || 1;
        drops = Array(columns).fill(1);
        ctx.font = fontSize + "px Orbitron, monospace";
    }

    function draw() {
        ctx.fillStyle = "rgba(5, 5, 16, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00f2ff";
        for (let i = 0; i < drops.length; i++) {
            const ch = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    window.addEventListener('resize', () => {
        if (animationId) cancelAnimationFrame(animationId);
        resizeCanvas();
        draw();
    });
}

window.onload = () => { showTab('home'); updateCartUI(); };


window.addEventListener('load', () => {
 
    initFirebaseComments();
 
    loadRemoteConfig();
    setupRemoteSync();
 
    loadEmailConfig();
    initEmailJS();
});


function openPrivateFeedback() {
    const modal = document.getElementById('private-feedback-modal');
    if (!modal) return;
    modal.classList.add('modal-active');
    setupRating();
}

function closePrivateFeedback() {
    const modal = document.getElementById('private-feedback-modal');
    if (!modal) return;
    modal.classList.remove('modal-active');
}

function openEmailConfig() {
    const modal = document.getElementById('email-config-modal');
    if (!modal) return;
    modal.classList.add('modal-active');

    const s = document.getElementById('email-service-id'); if (s) s.value = emailConfig.serviceId || '';
    const t = document.getElementById('email-template-id'); if (t) t.value = emailConfig.templateId || '';
    const k = document.getElementById('email-public-key'); if (k) k.value = emailConfig.publicKey || '';
    const o = document.getElementById('email-owner'); if (o) o.value = emailConfig.ownerEmail || '';
}

function closeEmailConfig() {
    const modal = document.getElementById('email-config-modal');
    if (!modal) return; modal.classList.remove('modal-active');
}

function loadEmailConfig() {
    try {
        const raw = localStorage.getItem('nexus_email_cfg');
        if (raw) emailConfig = Object.assign(emailConfig || {}, JSON.parse(raw));
      
    } catch (e) { console.warn('loadEmailConfig', e); }
}

function saveEmailConfig() {
    const serviceId = document.getElementById('email-service-id').value.trim();
    const templateId = document.getElementById('email-template-id').value.trim();
    const publicKey = document.getElementById('email-public-key').value.trim();
    const ownerEmail = document.getElementById('email-owner').value.trim();
    emailConfig = { serviceId, templateId, publicKey, ownerEmail };
    try { localStorage.setItem('nexus_email_cfg', JSON.stringify(emailConfig)); } catch(e) {}
    initEmailJS();
    showNotification('Configurações de email salvas.');
}

function initEmailJS() {
    try {
        if (typeof emailjs !== 'undefined' && emailConfig && emailConfig.publicKey) {
            try { emailjs.init(emailConfig.publicKey); } catch (e) { console.warn('emailjs init', e); }
        }
    } catch (e) { console.warn('initEmailJS', e); }
}

function testEmailConfig() {
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey || !emailConfig.ownerEmail) return showNotification('Preencha todas as configurações do EmailJS.', true);
    
    const params = { name: 'Teste', type: 'teste', text: 'Mensagem de teste', date: new Date().toLocaleString(), owner: emailConfig.ownerEmail };
    emailjs.send(emailConfig.serviceId, emailConfig.templateId, params).then(() => {
        showNotification('Email de teste enviado. Verifique seu email.');
    }).catch(err => {
        console.error(err);
        showNotification('Falha ao enviar email de teste.', true);
    });
}

function fillExampleEmailConfig() {
    emailConfig = {
        serviceId: 'service_example',
        templateId: 'template_example',
        publicKey: 'user_example',
        ownerEmail: emailConfig.ownerEmail || ''
    };
    try { localStorage.setItem('nexus_email_cfg', JSON.stringify(emailConfig)); } catch(e) {}
  
    const s = document.getElementById('email-service-id'); if (s) s.value = emailConfig.serviceId;
    const t = document.getElementById('email-template-id'); if (t) t.value = emailConfig.templateId;
    const k = document.getElementById('email-public-key'); if (k) k.value = emailConfig.publicKey;
    const o = document.getElementById('email-owner'); if (o) o.value = emailConfig.ownerEmail;
    initEmailJS();
    showNotification('Exemplo preenchido. Substitua pelos valores reais para enviar.');
}

function copyRecommendedTemplate() {
    const template = {
      
        name: '{{name}}',
        type: '{{type}}',
        text: '{{text}}',
        date: '{{date}}',
        owner: '{{owner}}'
    };
    const text = JSON.stringify({ subject: 'Novo feedback do site', template_variables: template }, null, 2);
    try {
        navigator.clipboard.writeText(text);
        showNotification('Template recomendado copiado para a área de transferência.');
    } catch (e) {
        console.warn(e);
        showNotification('Não foi possível copiar automaticamente. Veja instruções no console.', true);
        console.log('TEMPLATE RECOMENDADO:\n', text);
    }
}

function submitPrivateFeedback() {
    const name = (document.getElementById('pf-name') && document.getElementById('pf-name').value.trim()) || 'Anônimo';
    const type = (document.getElementById('pf-type') && document.getElementById('pf-type').value) || 'elogio';
    const text = (document.getElementById('pf-text') && document.getElementById('pf-text').value.trim()) || '';
    if (!text) return showNotification('Escreva uma mensagem antes de enviar.', true);

    const entry = { id: Date.now().toString(), name, type, text, date: new Date().toLocaleString(), dateEpoch: Date.now() };
  
    try {
        const arr = JSON.parse(localStorage.getItem('nexus_private_submissions') || '[]');
        arr.unshift(entry);
        localStorage.setItem('nexus_private_submissions', JSON.stringify(arr));
    } catch (e) { console.warn('save private local', e); }

  
    if (emailConfig && emailConfig.serviceId && emailConfig.templateId && (typeof emailjs !== 'undefined')) {
        const params = Object.assign({ owner: emailConfig.ownerEmail }, entry);
        emailjs.send(emailConfig.serviceId, emailConfig.templateId, params).then(() => {
            showNotification('Mensagem enviada ao proprietário. Obrigado!');
            closePrivateFeedback();
          
            document.getElementById('pf-text').value = '';
        }).catch(err => {
            console.error(err);
            showNotification('Falha ao enviar ao proprietário. Mensagem salva localmente.', true);
            closePrivateFeedback();
        });
    } else {
        showNotification('Mensagem salva localmente. Configure EmailJS para enviar ao Gmail.');
        closePrivateFeedback();
    }
}

