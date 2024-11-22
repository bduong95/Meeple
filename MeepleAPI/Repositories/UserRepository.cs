using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using MeepleAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeepleAPI.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DynamoDBContext _context;

        public UsersRepository(IAmazonDynamoDB dynamoDb)
        {
            _context = new DynamoDBContext(dynamoDb);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            var scanConditions = new List<ScanCondition>();
            return await _context.ScanAsync<User>(scanConditions).GetRemainingAsync();
        }

        public async Task<User> GetUserByIdAsync(string userId)
        {
            return await _context.LoadAsync<User>(userId);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.SaveAsync(user);
        }

        public async Task UpdateUserAsync(string userId, User user)
        {
            await _context.SaveAsync(user);
        }

        public async Task DeleteUserAsync(string userId)
        {
            await _context.DeleteAsync<User>(userId);
        }
    }
}