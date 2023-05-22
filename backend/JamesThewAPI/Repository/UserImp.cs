using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using System.Security.Principal;

namespace JamesThewAPI.Repository
{
    public class UserImp : IUser
    {
        private readonly DatabaseContext _dbContext;
        public UserImp(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> AddUserAsync(User user)
        {
            var userDB = _dbContext.Users.FirstOrDefault(u => u.Email.Equals(user.Email));
            user.Email = user.Email.ToLower();
            if (userDB == null)
            {
                user.Password = UserSecurity.EncodePlanTet(user.Password);
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            else
            {
                return null;
            }
        }

        public async Task<User> ChangeUserPassAsync(string email, string oldPass, string newPass)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email.Equals(email));
            if (user != null && UserSecurity.DecodePlanTet(oldPass).Equals(user.Password))
            {
                user.Password = UserSecurity.EncodePlanTet(newPass);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            else if (user != null && !UserSecurity.DecodePlanTet(oldPass).Equals(user.Password)) return null;
            else return null;

        }

        //public async Task<User> CheckLogin(string email, string pass)
        //{
        //    var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email.Equals(email));
        //    if (user != null)
        //    {
        //        bool aPin = UserSecurity.DecodePlanTet(user.Password).Equals(pass);
        //        if (aPin)
        //        {
        //            return user;
        //        }
        //        else
        //        {
        //            return null;
        //        }
        //    }
        //    else
        //    {
        //        return null;
        //    }
        //}

        public async Task<bool> DeleteUserAsync(int UId)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UId.Equals(UId));
            if (user != null)
            {
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else return false;
        }

        public async Task<User> GetUserAsync(int UId)
        {
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.UId.Equals(UId));
            if (user != null) return user;
            else return null;
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            var userDB = await _dbContext.Users.FindAsync(user.UId);
            if (userDB != null)
            {
                user.Email = user.Email.ToLower();
                user.Password = userDB.Password;
                _dbContext.Entry(user).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                return user;
            }
            else  return null;
        }
    }
}
