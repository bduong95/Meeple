using Amazon.DynamoDBv2.DataModel;

namespace MeepleAPI.Models
{
    [DynamoDBTable("Collections")]
    public class Collection
    {
        [DynamoDBHashKey]
        public string UserId { get; set; }

        [DynamoDBRangeKey]
        public string GameId { get; set; }
    }

}
