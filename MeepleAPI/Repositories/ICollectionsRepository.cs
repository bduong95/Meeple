using MeepleAPI.Models; // Namespace for Game model
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeepleAPI.Repositories
{
    public interface ICollectionsRepository
    {
        Task AddToCollectionAsync(string userId, string gameId); // Adds a game to the collection
        Task<IEnumerable<Game>> GetCollectionAsync(string userId); // Retrieves all games in the user's collection
        Task RemoveFromCollectionAsync(string userId, string gameId); // Removes a game from the collection
    }
}
