export default class MethodsHttp {
    static async deletePlayer(id) {
        if (confirm('Você tem certeza que deseja excluir?')) {
            try {
                const response = await fetch(`/player/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert('Jogador excluído com sucesso!');
                    window.location.reload(); // Recarrega a página automaticamente
                } else {
                    alert('Erro ao excluir jogador.');
                }
            } catch (error) {
                alert('Erro na comunicação com o servidor');
                console.error('Erro:', error); // Log de erro detalhado
            }
        }
    }
}
