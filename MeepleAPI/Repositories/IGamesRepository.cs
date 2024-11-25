using MeepleAPI.Models; // Namespace for your Game model
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeepleAPI.Repositories
{
    public interface IGamesRepository
    {
        Task<IEnumerable<Game>> GetAllGamesAsync();
        Task<Game> GetGameByIdAsync(string gameId);
        Task AddGameAsync(Game game);
        Task UpdateGameAsync(string gameId, Game game);
        Task DeleteGameAsync(string gameId);
        Task<IEnumerable<Game>> GetFilteredGamesAsync(string? genre, string? difficultyLevel, string? sortBy);


    }
}
