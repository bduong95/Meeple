using Amazon.DynamoDBv2.DataModel;

namespace MeepleAPI.Models
{
    [DynamoDBTable("Games")] // Map this class to the Games table in DynamoDB
    public class Game
    {
        [DynamoDBHashKey] // Mark GameId as the partition key
        public string GameId { get; set; } = Guid.NewGuid().ToString();

        public string Name { get; set; }
        public string Genre { get; set; }
        public string DifficultyLevel { get; set; }
        public string PlayStyle { get; set; }
        public int Players { get; set; }
        public double BoardGameArenaRating { get; set; }
    }
}
