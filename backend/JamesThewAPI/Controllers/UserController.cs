using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using JamesThewAPI.ModelUtility.CustomResult;
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
        //[Authorize(Roles = $"{UserRole.Admin}")]
        public async Task<ActionResult<CustomRespone<IEnumerable<User>>>> GetAllUsers()
        {
            try
            {
                var resources = await _userRepo.GetUsersAsync();
                if (resources != null && resources.Any())
                {
                    var response = new CustomRespone<IEnumerable<User>>
                            (StatusCodes.Status200OK, "All User", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<IEnumerable<User>>(StatusCodes.Status404NotFound, "Failed!!!!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while view all user", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpGet("{UId}")]
        public async Task<ActionResult<CustomRespone<User>>> GetUserById(int UId)
        {
            try
            {
                var resources = await _userRepo.GetUserAsync(UId);
                if (resources != null)
                {
                    var response = new CustomRespone<User>
                            (StatusCodes.Status200OK, "View User", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "View User failed!!!!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while view user", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CustomRespone<User>>> PostUser([FromForm] User user, IFormFile? file)
        {
            try
            {
                var resources = await _userRepo.AddUserAsync(user, file);
                if (resources != null)
                {
                    var response = new CustomRespone<User>
                            (StatusCodes.Status200OK, "User added", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email already used! Try to login", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while add model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPut]
        public async Task<ActionResult<CustomRespone<User>>> UpdateUser([FromForm] User user, IFormFile? file)
        {
            try
            {
                var resources = await _userRepo.UpdateUserAsync(user,file);
                if (resources != null)
                {
                    var response = new CustomRespone<User>
                            (StatusCodes.Status200OK, "User updated", resources, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Email already used! Try an other email", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while update model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpDelete("{UId}")]
        [Authorize(Roles = $"{UserRole.Admin}")]
        public async Task<ActionResult<CustomRespone<User>>> DeleteUser(int UId)
        {
            try
            {
                var resources = await _userRepo.DeleteUserAsync(UId);
                if (resources != false)
                {
                    var response = new CustomRespone<User>
                            (StatusCodes.Status200OK, "Delete successfully", null, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Delete User failed!!!!!!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while delete model", null, ex.Message);
                return BadRequest(response);
            }
        }

        [HttpPut("changepass")]
        public async Task<ActionResult<CustomRespone<User>>> ChangePass(string email, string oldPass, string newPass)
        {
            try
            {
                var resources = await _userRepo.ChangeUserPassAsync(email,oldPass,newPass);
                if (resources != null)
                {
                    var response = new CustomRespone<User>
                            (StatusCodes.Status200OK, "Change password successfully", null, null);
                    return Ok(response);
                }
                else
                {
                    var response = new CustomRespone<User>(StatusCodes.Status404NotFound, "Wrong email or password!", null, null);
                    return NotFound(response);
                }
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<User>(StatusCodes.Status500InternalServerError, "An error occured while change password", null, ex.Message);
                return BadRequest(response);
            }
        }
    }
}
