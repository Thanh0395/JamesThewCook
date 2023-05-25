using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Principal;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _userRepo;
        public UserController(IUser userRepo)
        {
            _userRepo = userRepo;  
        }
        [HttpGet]
        [Authorize(Roles = $"{UserRole.Admin}")]
        public Task<IEnumerable<User>> GetAllUsers()
        {
            return _userRepo.GetUsersAsync();
        }

        [HttpGet("{UId}")]
        public Task<User> GetUserById(int UId)
        {
            return _userRepo.GetUserAsync(UId);
        }

        [HttpPost]
        public Task<User> PostUser(User user)
        {
            return _userRepo.AddUserAsync(user);
        }

        [HttpPut("{UId}")]
        public Task<User> UpdateUser(User user)
        {
            return _userRepo.UpdateUserAsync(user);
        }

        [HttpDelete("{UId}")]
        [Authorize(Roles = $"{UserRole.Admin}")]
        public async Task<bool> DeleteUser(int UId)
        {
            return await _userRepo.DeleteUserAsync(UId);
        }

        //[HttpGet("{email}/{pass}")]
        //public Task<User> CheckLogin(string email, string pass)
        //{
        //    return _userRepo.CheckLogin(email,pass);
        //}
    }
}
