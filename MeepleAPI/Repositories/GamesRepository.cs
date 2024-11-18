using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using MeepleAPI.Models; // Import the Game model namespace
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeepleAPI.Repositories
{
    public class GamesRepository : IGamesRepository
    {
        private readonly Table _gamesTable;

        public GamesRepository(IAmazonDynamoDB dynamoDB)
        {
            _gamesTable = Table.LoadTable(dynamoDB, "Games");
        }

        public async Task<IEnumerable<Game>> GetAllGamesAsync()
        {
            var search = _gamesTable.Scan(new ScanFilter());
            var documents = await search.GetNextSetAsync();
            return documents.Select(doc => new Game
            {
                GameId = doc["GameId"],
                Name = doc["Name"],
                Genre = doc["Genre"],
                DifficultyLevel = doc["DifficultyLevel"],
                PlayStyle = doc["PlayStyle"],
                Players = int.Parse(doc["Players"]),
                BoardGameArenaRating = double.Parse(doc["BoardGameArenaRating"])
            });
        }

        public async Task<Game> GetGameByIdAsync(string gameId)
        {
            var document = await _gamesTable.GetItemAsync(gameId);
            if (document == null) return null;

            return new Game
            {
                GameId = document["GameId"],
                Name = document["Name"],
                Genre = document["Genre"],
                DifficultyLevel = document["DifficultyLevel"],
                PlayStyle = document["PlayStyle"],
                Players = int.Parse(document["Players"]),
                BoardGameArenaRating = double.Parse(document["BoardGameArenaRating"])
            };
        }

        public async Task AddGameAsync(Game game)
        {
            var document = new Document
            {
                ["GameId"] = game.GameId,
                ["Name"] = game.Name,
                ["Genre"] = game.Genre,
                ["DifficultyLevel"] = game.DifficultyLevel,
                ["PlayStyle"] = game.PlayStyle,
                ["Players"] = game.Players,
                ["BoardGameArenaRating"] = game.BoardGameArenaRating
            };

            await _gamesTable.PutItemAsync(document);
        }

        public async Task UpdateGameAsync(string gameId, Game game)
        {
            var document = await _gamesTable.GetItemAsync(gameId);
            if (document != null)
            {
                document["Name"] = game.Name;
                document["Genre"] = game.Genre;
                document["DifficultyLevel"] = game.DifficultyLevel;
                document["PlayStyle"] = game.PlayStyle;
                document["Players"] = game.Players;
                document["BoardGameArenaRating"] = game.BoardGameArenaRating;

                await _gamesTable.UpdateItemAsync(document);
            }
        }

        public async Task DeleteGameAsync(string gameId)
        {
            await _gamesTable.DeleteItemAsync(gameId);
        }
    }
}
