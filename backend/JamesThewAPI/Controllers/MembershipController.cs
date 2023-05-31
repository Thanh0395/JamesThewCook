using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MembershipController : ControllerBase
    {
        private readonly IMembership _membershipRepo;
        public MembershipController(IMembership membershipRepo)
        {
            _membershipRepo = membershipRepo;
        }
        [HttpGet]
        [Authorize(Roles = $"{UserRole.Admin},{UserRole.User}")]
        //[Authorize(Roles = $"{UserRole.Admin},{UserRole.User},{UserRole.Membership}")]
        public async Task<ActionResult<Membership>> ChargeMembership(int UserID, int month)
        {
            try
            {
                var membership = await _membershipRepo.AddMembershipDateAsync(UserID, month);
                if (membership != null)
                {
                    var response = new CustomRespone<Membership>(200, "Payment successfully", membership, null);
                    return Ok(response);
                }
                else
                {
                    return StatusCode(StatusCodes.Status403Forbidden,
                        new CustomRespone<Membership>(403, "You are already a Membership", null, null));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new CustomRespone<Membership>(403, "An error occured while paying membership", null, ex.Message));
            }
        }

        [HttpPut]
        [Authorize(Roles = $"{UserRole.Admin}")]
        public async Task<ActionResult<Membership>> UpdateMembership()
        {
            try
            {
                var listMembership = await _membershipRepo.UpdateMembershipAsync();
                var response = new CustomRespone<IEnumerable<Membership>>
                (StatusCodes.Status200OK, "Update Membership successfully", null, null);
                return Ok(response);
            }
            catch (Exception ex)
            {
                var response = new CustomRespone<IEnumerable<Membership>>(StatusCodes.Status500InternalServerError, "An error occured while retrived model", null, ex.Message);
                return BadRequest(response);
            }
        }
    }
}
