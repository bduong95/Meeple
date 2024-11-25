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
            return ConvertDocumentsToGames(documents);
        }

        public async Task<Game> GetGameByIdAsync(string gameId)
        {
            var document = await _gamesTable.GetItemAsync(gameId);
            return document == null ? null : ConvertDocumentToGame(document);
        }

        public async Task AddGameAsync(Game game)
        {
            var document = ConvertGameToDocument(game);
            await _gamesTable.PutItemAsync(document);
        }

        public async Task UpdateGameAsync(string gameId, Game game)
        {
            var document = await _gamesTable.GetItemAsync(gameId);
            if (document != null)
            {
                document = ConvertGameToDocument(game);
                await _gamesTable.PutItemAsync(document);
            }
        }

        public async Task DeleteGameAsync(string gameId)
        {
            await _gamesTable.DeleteItemAsync(gameId);
        }

        public async Task<IEnumerable<Game>> GetFilteredGamesAsync(string? genre, string? difficultyLevel, string? sortBy)
        {
            var scanFilter = new ScanFilter();

            // Add filtering conditions
            if (!string.IsNullOrEmpty(genre))
            {
                scanFilter.AddCondition("Genre", ScanOperator.Equal, genre);
            }

            if (!string.IsNullOrEmpty(difficultyLevel))
            {
                scanFilter.AddCondition("DifficultyLevel", ScanOperator.Equal, difficultyLevel);
            }

            // Perform the scan
            var search = _gamesTable.Scan(scanFilter);
            var documents = await search.GetNextSetAsync();
            var games = ConvertDocumentsToGames(documents);

            // Apply sorting if specified
            return sortBy?.ToLower() switch
            {
                "rating" => games.OrderByDescending(g => g.BoardGameArenaRating),
                "players" => games.OrderByDescending(g => g.Players),
                _ => games
            };
        }

        // Helper methods to convert between Game and Document
        private IEnumerable<Game> ConvertDocumentsToGames(IEnumerable<Document> documents)
        {
            return documents.Select(doc => ConvertDocumentToGame(doc));
        }

        private Game ConvertDocumentToGame(Document document)
        {
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

        private Document ConvertGameToDocument(Game game)
        {
            return new Document
            {
                ["GameId"] = game.GameId,
                ["Name"] = game.Name,
                ["Genre"] = game.Genre,
                ["DifficultyLevel"] = game.DifficultyLevel,
                ["PlayStyle"] = game.PlayStyle,
                ["Players"] = game.Players,
                ["BoardGameArenaRating"] = game.BoardGameArenaRating
            };
        }
    }

}
