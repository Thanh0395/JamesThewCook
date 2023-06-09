using JamesThewAPI.Entities;
using System.Security.Principal;

namespace JamesThewAPI.Repository
{
    public interface IUser
    {
        //sua tren nhanh hung ne
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User> GetUserAsync(int UId);
        Task<User> AddUserAsync(User user, IFormFile? file);
        Task<User> UpdateUserAsync(User user, IFormFile? file);
        Task<bool> DeleteUserAsync(int UId);

        Task<User> ChangeUserPassAsync(string email, string oldPass, string newPass);
        //Task<User> CheckLogin(string email, string pass);
    }
}
