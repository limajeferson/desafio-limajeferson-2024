import { RecintosZoo } from './recintos-zoo.js';
import readline from 'readline';

const rdline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const zoo = new RecintosZoo();

function perguntar() {
    rdline.question('Digite a espécie e a quantidade (ex: "MACACO", 2): ', (input) => {
        const [animal, quantidade] = input.replace(/"/g, '').split(', ');
        const quantidadeNum = parseInt(quantidade, 10);

        if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
            console.log('Quantidade inválida. Tente novamente.');
            perguntar();
            return;
        }

        const resultado = zoo.analisaRecintos(animal, quantidadeNum);
        console.log(JSON.stringify(resultado, null, 2));

        rdline.close();
    });
}

perguntar();
