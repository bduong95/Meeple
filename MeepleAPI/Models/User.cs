using Amazon.DynamoDBv2.DataModel;

namespace MeepleAPI.Models
{
    [DynamoDBTable("Users")] // Ensure the table name matches your DynamoDB configuration
    public class User
    {
        [DynamoDBHashKey] // Primary key
        public string UserId { get; set; }

        [DynamoDBProperty]
        public string Username { get; set; }

        [DynamoDBProperty]
        public string Email { get; set; }

        [DynamoDBProperty]
        public string Password { get; set; } // Consider hashing this later for security
    }
}