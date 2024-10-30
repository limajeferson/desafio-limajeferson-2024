class RecintosZoo {

    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { especie: "MACACO", quantidade: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: { especie: null, quantidade: 0 } },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { especie: "GAZELA", quantidade: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: { especie: null, quantidade: 0 } },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { especie: "LEAO", quantidade: 1 } }
        ];

        this.espacoIndividual = [
            { especie: "LEAO", tamanho: 3, biomas: ["savana", "savana e rio"], carnivoro: true },
            { especie: "LEOPARDO", tamanho: 2, biomas: ["savana", "savana e rio"], carnivoro: true },
            { especie: "CROCODILO", tamanho: 3, biomas: ["rio", "savana e rio"], carnivoro: true },
            { especie: "MACACO", tamanho: 1, biomas: ["savana", "floresta", "savana e rio"], carnivoro: false },
            { especie: "GAZELA", tamanho: 2, biomas: ["savana", "savana e rio"], carnivoro: false },
            { especie: "HIPOPOTAMO", tamanho: 4, biomas: ["savana", "rio", "savana e rio"], carnivoro: false }
        ];
    }

    analisaRecintos(animal, quantidade) {

        // valida se é um animal habilitado para o zoo tratar
        const validaAnimal = this.espacoIndividual.find(a => a.especie === animal);
        if (!validaAnimal) {
            return { erro: "Animal inválido" };
        }

        // valida quantidade
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        // determinando o espaco necessario
        const espacoNecessario = validaAnimal.tamanho * quantidade;

        // lógica para viabilização do animal
        const recintosViaveis = this.recintos.filter(
            recinto => {
                const biomaCompativel = validaAnimal.biomas.some(bioma => recinto.bioma.includes(bioma));
                // regra1 se está confortavel com o bioma
                if (!biomaCompativel) return false;

                // regra1 se é a mesma especie no bioma ele verifica ocupacao de espaco
                const espacoOcupado = recinto.animaisExistentes.especie
                    ? recinto.animaisExistentes.quantidade * this.espacoIndividual.find(a => a.especie === recinto.animaisExistentes.especie).tamanho
                    : 0;

                // regra1 calcula o espaço livre antes da chegada do animal 
                const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

                // regra1 (espaço) conclusão da regra 1 
                if (recinto.animaisExistentes.especie && espacoLivre < espacoNecessario) {
                    return false;
                }

                // regra2 verifica se animais carnivoros estao habitando apenas com a mesma especie
                if (validaAnimal.carnivoro && recinto.animaisExistentes.especie && recinto.animaisExistentes.especie !== animal) {
                    return false;
                }

                // ! verificar teste manual INICIO //
                // regra3&5 evitar outras especies com carnivoros
                if (!validaAnimal.carnivoro && recinto.animaisExistentes.especie) {
                    if (this.espacoIndividual.find(a => a.especie === recinto.animaisExistentes.especie)?.carnivoro) {
                        return false;
                    }
                }

                if (animal === "HIPOPOTAMO") {
                    if (recinto.animaisExistentes.especie && recinto.animaisExistentes.especie !== "HIPOPOTAMO") {
                        if (recinto.bioma !== "savana e rio") {
                            return false;
                        }
                    }
                }
                // ! verificar teste manual FIM //

                // regra5
                if (animal === "MACACO" && recinto.animaisExistentes.especie && !validaAnimal.biomas.includes(recinto.bioma)) {
                    return false;
                }

                // regra 6
                const espacoNecessarioAjustado = recinto.animaisExistentes.especie ? espacoNecessario + 1 : espacoNecessario;

                return espacoLivre >= espacoNecessarioAjustado;
            }
        );

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return {
            recintosViaveis: recintosViaveis.map(recinto => {
                const espacoOcupado = recinto.animaisExistentes.especie
                    ? recinto.animaisExistentes.especie !== animal
                        ? (recinto.animaisExistentes.quantidade * this.espacoIndividual.find(a => a.especie === recinto.animaisExistentes.especie).tamanho) + 1
                        : (recinto.animaisExistentes.quantidade * this.espacoIndividual.find(a => a.especie === recinto.animaisExistentes.especie).tamanho)
                    : 0;
                const espacoLivreAtualizado = recinto.tamanhoTotal - espacoOcupado - espacoNecessario;
                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivreAtualizado} total: ${recinto.tamanhoTotal})`;
            }
            )
        };


    }

}

export { RecintosZoo as RecintosZoo };
