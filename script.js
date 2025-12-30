let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
let comments = JSON.parse(localStorage.getItem('nexus_comments')) || [];
let firebaseEnabled = false;
let fbRef = null;
let historyStack = ['home'];

const staffMembers = [
    { name: "Luis Alberto Otto", role: "Vice-Diretor Executivo" },
    { name: "Marcos Oliveira", role: "Diretor Geral de Vendas e Compras" },
    { name: "Lucas Ferreira", role: "Especialista em Hardware" },
    { name: "Juliana Costa", role: "Designer de Interfaces" },
    { name: "Ricardo Santos", role: "Suporte Técnico Nível 3" },
    { name: "Fernanda Lima", role: "Analista de Mercado Gamer" },
    { name: "Bruno Souza", role: "Desenvolvedor Backend" },
    { name: "Camila Rocha", role: "Gestora de Comunidade" },
    { name: "Thiago Alves", role: "Especialista em Overclock" },
    { name: "Patrícia Melo", role: "Controle de Qualidade" },
    { name: "Felipe Nascimento", role: "Técnico de Redes" },
    { name: "Mariana Guimarães", role: "Social Media" },
    { name: "Gustavo Henrique", role: "Consultor de Vendas" },
    { name: "Letícia Mendes", role: "Recursos Humanos" },
    { name: "Rodrigo Silva", role: "Segurança Cibernética" },
    { name: "Beatriz Nogueira", role: "Logística" },
    { name: "Eduardo Paiva", role: "Manutenção de Consoles" },
    { name: "Sofia Martins", role: "Atendimento ao Cliente" },
    { name: "Gabriel Dantas", role: "Tester de Jogos" },
    { name: "Isabela Rios", role: "Marketing Digital" },
    { name: "Vinícius Jr", role: "Suporte de Hardware" },
    { name: "Carla Perez", role: "Financeiro" },
    { name: "Daniel Ohana", role: "Arquitetura de Sistemas" },
    { name: "Evelyn Castro", role: "Copywriter" },
    { name: "Fernando Guedes", role: "Estoquista" },
    { name: "Gisele Bündchen", role: "Relações Públicas" },
    { name: "Hugo Boss", role: "Design de Produto" },
    { name: "Igor Kannário", role: "Eventos" },
    { name: "Jéssica Jones", role: "Investigadora de Fraudes" },
    { name: "Kevin Durant", role: "Treinador de E-sports" },
    { name: "Lara Croft", role: "Exploração de Mercado" },
    { name: "Mario Bros", role: "Encanador Técnico" },
    { name: "Nina Dobrev", role: "Casting" },
    { name: "Otávio Mesquita", role: "Repórter de Tecnologia" },
    { name: "Paulo Muzy", role: "Saúde Ocupacional" },
    { name: "Quentin Tarantino", role: "Diretor de Vídeo" },
    { name: "Rafaela Silva", role: "Segurança Patrimonial" },
    { name: "Silvio Santos", role: "Apresentador de Produtos" },
    { name: "Tati Quebra Barraco", role: "Gestão de Crises" },
    { name: "Ulysses Guimarães", role: "Jurídico" },
    { name: "Valesca Popozuda", role: "Entretenimento" },
    { name: "Wagner Moura", role: "Inteligência de Mercado" },
    { name: "Xuxa Meneghel", role: "Embaixadora da Marca" },
    { name: "Yuri Alberto", role: "Agente de Negócios" },
    { name: "Zeca Pagodinho", role: "Consultor de Lazer" },
    { name: "Arthur Aguiar", role: "Estrategista" },
    { name: "Bruna Marquezine", role: "Branding" },
    { name: "Caio Castro", role: "Logística Veloz" },
    { name: "Deborah Secco", role: "Produção Executiva" },
    { name: "Emilio Surita", role: "Comunicação Interna" }
];

const catalog = {
    pc: [
        { id: 101, name: "PC Nexus Alpha i9", price: 18500, img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=300" },
        { id: 102, name: "Nexus Stealth Ryzen 9", price: 14200, img: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300" },
        { id: 103, name: "Workstation Pro X", price: 22000, img: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=300" },
        { id: 104, name: "Nexus Mini Beast", price: 8900, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300" },
        { id: 105, name: "RTX 4090 Ultra PC", price: 25000, img: "https://images.unsplash.com/photo-1625842268584-8f3bf9ffad32?w=300" },
        { id: 106, name: "Nexus Streamer Ed.", price: 11500, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=300" },
        { id: 107, name: "Laptop Nexus G15", price: 7500, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300" },
        { id: 108, name: "Laptop Nexus G17", price: 9800, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300" },
        { id: 109, name: "Nexus Creator PC", price: 16400, img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300" },
        { id: 110, name: "Nexus White Edition", price: 13200, img: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=300" },
        { id: 111, name: "Nexus Carbon Ryzen 7", price: 10500, img: "https://images.unsplash.com/photo-1591405351990-4726e331f141?w=300" },
        { id: 112, name: "Nexus Phoenix i7", price: 9200, img: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=300" },
        { id: 113, name: "PC Gamer Entry Level", price: 4500, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300" },
        { id: 114, name: "Nexus Titan Dual GPU", price: 32000, img: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?w=300" },
        { id: 115, name: "Nexus Liquid cooled", price: 19800, img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=300" },
        { id: 116, name: "Retro PC Nexus", price: 6200, img: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=300" },
        { id: 117, name: "Nexus Silent Pro", price: 12400, img: "https://images.unsplash.com/photo-1605398407797-00c2f269d042?w=300" },
        { id: 118, name: "Nexus RGB Overload", price: 15600, img: "https://images.unsplash.com/photo-1555617766-c94804975da3?w=300" },
        { id: 119, name: "Laptop Nexus Air", price: 6800, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300" },
        { id: 120, name: "Nexus Quantum Elite", price: 45000, img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300" }
    ],
    ps5: [
        { id: 201, name: "PS5 Standard Edition", price: 4200, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300" },
        { id: 202, name: "PS5 Digital Edition", price: 3800, img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=300" },
        { id: 203, name: "DualSense Branco", price: 450, img: "https://images.unsplash.com/photo-1592155934442-cd1821f5d7ec?w=300" },
        { id: 204, name: "DualSense Midnight", price: 480, img: "https://images.unsplash.com/photo-1622239434110-fd4565344465?w=300" },
        { id: 205, name: "Headset Pulse 3D", price: 590, img: "https://images.unsplash.com/photo-1612197539554-95687572640f?w=300" },
        { id: 206, name: "HD Externo 2TB PS5", price: 650, img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300" },
        { id: 207, name: "Controle Edge Pro", price: 1450, img: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=300" },
        { id: 208, name: "Base Carregadora", price: 190, img: "https://images.unsplash.com/photo-1544650030-3c69847444cd?w=300" },
        { id: 209, name: "Câmera HD PS5", price: 350, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
        { id: 210, name: "Spider-Man 2 Bundle", price: 4900, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=300" },
        { id: 211, name: "God of War Ragnarok", price: 349, img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=300" },
        { id: 212, name: "Elden Ring PS5", price: 299, img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300" },
        { id: 213, name: "Capas PS5 Vermelha", price: 280, img: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=300" },
        { id: 214, name: "Controle Cobalt Blue", price: 499, img: "https://images.unsplash.com/photo-1592155934442-cd1821f5d7ec?w=300" },
        { id: 215, name: "Suporte Vertical RGB", price: 150, img: "https://images.unsplash.com/photo-1544650030-3c69847444cd?w=300" },
        { id: 216, name: "GTA V Expanded", price: 199, img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=300" },
        { id: 217, name: "Mortal Kombat 1", price: 349, img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=300" },
        { id: 218, name: "Final Fantasy XVI", price: 349, img: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=300" },
        { id: 219, name: "SSD NVMe 1TB PS5", price: 890, img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300" },
        { id: 220, name: "PS VR2 Headset", price: 4500, img: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=300" }
    ],
    perifericos: [
        { id: 301, name: "Teclado Razer BlackWidow", price: 890, img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=300" },
        { id: 302, name: "Mouse Logitech G502", price: 450, img: "https://images.unsplash.com/photo-1527814732934-719137c81371?w=300" },
        { id: 303, name: "Mousepad Nexus XXL", price: 120, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300" },
        { id: 304, name: "Headset HyperX Cloud II", price: 540, img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=300" },
        { id: 305, name: "Monitor Alienware 360Hz", price: 4200, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300" },
        { id: 306, name: "Cadeira Gamer Nexus Pro", price: 1800, img: "https://images.unsplash.com/photo-1598550476439-6847785fce6c?w=300" },
        { id: 307, name: "Microfone Shure SM7B", price: 3800, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300" },
        { id: 308, name: "Webcam Logitech C922", price: 620, img: "https://images.unsplash.com/photo-1616422285623-13ff0167c958?w=300" },
        { id: 309, name: "Stream Deck MK.2", price: 1100, img: "https://images.unsplash.com/photo-1616191136979-468087796d8e?w=300" },
        { id: 310, name: "Suporte Articulado", price: 290, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300" },
        { id: 311, name: "Iluminação Ring Light", price: 150, img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=300" },
        { id: 312, name: "Braço p/ Microfone", price: 180, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=300" },
        { id: 313, name: "Caixa de Som Edifier", price: 950, img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300" },
        { id: 314, name: "HUB USB 3.0 Nexus", price: 89, img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=300" },
        { id: 315, name: "Cabo HDMI 2.1 3m", price: 120, img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=300" },
        { id: 316, name: "Controle p/ PC Xbox", price: 450, img: "https://images.unsplash.com/photo-1585620385456-4759f9b5c7d9?w=300" },
        { id: 317, name: "Cooler p/ Notebook", price: 140, img: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300" },
        { id: 318, name: "Roteador Gaming WiFi 6", price: 1200, img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300" },
        { id: 319, name: "Óculos Anti-Blue", price: 95, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300" },
        { id: 320, name: "Kit Limpeza Periféricos", price: 45, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300" }
    ]
};

// NAVEGAÇÃO
function showTab(tabId, saveHistory = true) {
    if(saveHistory) historyStack.push(tabId);
    const app = document.getElementById('app');
    const feedback = document.getElementById('feedback-section');
    app.style.display = tabId === 'feedback' ? 'none' : 'block';
    feedback.style.display = tabId === 'feedback' ? 'block' : 'none';

    if(tabId === 'feedback') { renderComments(); setupRating(); return; }

    let content = `<button class="back-btn" onclick="goBack()">< Voltar</button>`;
    if(tabId === 'home') {
        content += `<h1>NEXUS GAMING HUB</h1><p>CEO: Gabriel Defreyn</p>
            <div class="grid"><div class="card" onclick="showTab('pc')"><h2>PC GAMING</h2></div>
            <div class="card" onclick="showTab('ps5')"><h2>PS5 GEAR</h2></div>
            <div class="card" onclick="showTab('perifericos')"><h2>EQUIPAMENTOS</h2></div></div>`;
    } else if(tabId === 'staff') {
        content += `<h1>EQUIPE NEXUS (50)</h1><div class="grid">`;
        staffMembers.forEach((m, i) => {
            content += `<div class="card" style="${i<2?'border:2px solid #00f2ff':''}"><h4>${m.name}</h4><p style="color:#00f2ff">${m.role}</p><p style="font-size:0.7rem;opacity:0.5">ID: #00${i+1}</p></div>`;
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

// --- Painel / Leaderboard & Minijogo (Clicker) ---
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

function goBack() { if(historyStack.length > 1) { historyStack.pop(); showTab(historyStack[historyStack.length-1], false); } }

// Toggle menu for mobile
function toggleMenu() {
    const header = document.querySelector('header');
    if (!header) return;
    header.classList.toggle('nav-open');
}

// CHECKOUT RESTAURADO
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

// COMENTÁRIOS COM FUNÇÃO DE EXCLUIR
function setupRating() {
    const select = document.getElementById('comm-rating');
    if(!select || select.options.length > 0) return;
    for(let i=1; i<=10; i++) {
        let opt = document.createElement('option');
        opt.value = i; opt.innerText = `Nota: ${i}`;
        select.appendChild(opt);
    }
}

// Initialize Firebase comments sync if Firebase is configured in the page
function initFirebaseComments() {
    if (typeof firebase === 'undefined' || !firebase || !firebase.database) return;
    try {
        const db = firebase.database();
        fbRef = db.ref('nexus_comments');
        firebaseEnabled = true;

        // Listen for remote changes and update local UI
        fbRef.on('value', snapshot => {
            const val = snapshot.val() || {};
            // val may be an object of keyed items where keys are ids
            const arr = Object.keys(val).map(k => val[k]).sort((a,b) => (b.dateEpoch||0) - (a.dateEpoch||0));
            comments = arr;
            try { localStorage.setItem('nexus_comments', JSON.stringify(comments)); } catch(e) {}
            renderComments();
        });
    } catch (e) {
        console.warn('Firestore init failed', e);
    }
}

function saveComment() {
    const name = document.getElementById('comm-name').value;
    const type = document.getElementById('comm-type').value;
    const rating = document.getElementById('comm-rating').value;
    const text = document.getElementById('comm-text').value;
    if(!name || !text || !rating) return showNotification("Preencha tudo!", true);

    const id = Date.now().toString();
    const newComment = { id, name, type, rating, text, date: new Date().toLocaleDateString(), dateEpoch: Date.now(), replies: [] };
    // If firebase is enabled, write to remote DB (will trigger the listener and update UI)
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

// FUNÇÃO PARA EXCLUIR COMENTÁRIO
function deleteComment(id) {
    if(!confirm("Deseja realmente excluir este comentário?")) return;
    // If firebase enabled, remove from remote DB
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
                    <span style="background:#00f2ff; color:black; padding:2px 8px; border-radius:4px; font-weight:bold; font-size:0.8rem;">⭐ ${c.rating}/10</span>
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

// CARRINHO
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

// MATRIX (responsive)
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

