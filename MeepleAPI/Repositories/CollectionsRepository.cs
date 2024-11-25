using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using MeepleAPI.Models;
using MeepleAPI.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class CollectionsRepository : ICollectionsRepository
{
    private readonly DynamoDBContext _context;

    public CollectionsRepository(IAmazonDynamoDB dynamoDB)
    {
        _context = new DynamoDBContext(dynamoDB);
    }

    public async Task AddToCollectionAsync(string userId, string gameId)
    {
        var collectionItem = new Collection
        {
            UserId = userId,
            GameId = gameId
        };
        await _context.SaveAsync(collectionItem);
    }

    public async Task<IEnumerable<Game>> GetCollectionAsync(string userId)
    {
        var queryConditions = new List<ScanCondition>
        {
            new ScanCondition("UserId", Amazon.DynamoDBv2.DocumentModel.ScanOperator.Equal, userId)
        };

        var collectionItems = await _context.ScanAsync<Collection>(queryConditions).GetRemainingAsync();
        var gameIds = collectionItems.Select(c => c.GameId);

        // Fetch games by their IDs
        var games = new List<Game>();
        foreach (var gameId in gameIds)
        {
            var game = await _context.LoadAsync<Game>(gameId);
            if (game != null)
                games.Add(game);
        }

        return games;
    }

    public async Task RemoveFromCollectionAsync(string userId, string gameId)
    {
        var collectionItem = new Collection { UserId = userId, GameId = gameId };
        await _context.DeleteAsync(collectionItem);
    }


}
