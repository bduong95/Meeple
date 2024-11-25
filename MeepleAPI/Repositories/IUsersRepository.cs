using MeepleAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MeepleAPI.Repositories
{
    public interface IUsersRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string userId);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(string userId, User user);
        Task DeleteUserAsync(string userId);
        Task<User> GetUserByEmailAsync(string email);
    }
}