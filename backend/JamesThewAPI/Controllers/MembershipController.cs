using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility;
using JamesThewAPI.ModelUtility.CustomResult;
using JamesThewAPI.ModelUtility.Payment;
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
                    return StatusCode(StatusCodes.Status200OK,
                        new CustomRespone<Membership>(200, "You are already a Membership", null, null));
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new CustomRespone<Membership>(403, "An error occured while paying membership", null, ex.Message));
            }
        }

        //[HttpPost]
        //public async Task<ActionResult<Membership>> SuccessChargeMembership(int UserID, int month)
        //{
        //    try
        //    {
        //        //vnpay
        //        //Get Config Info
        //        string vnp_Returnurl = $"http://localhost:5013/api/Membership?UserID={UserID}&month={month}"; //URL nhan ket qua tra ve 
        //        string vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; //URL thanh toan cua VNPAY 
        //        string vnp_TmnCode = "PB9RYKRD"; //Ma định danh merchant kết nối (Terminal Id)
        //        string vnp_HashSecret = "LDKGFMFXNDLQMZSPKRPCEAIDZAMFCGNG"; //Secret Key

        //        //Get payment input
        //        //OrderInfo order = new OrderInfo();
        //        //order.OrderId = DateTime.Now.Ticks; // Giả lập mã giao dịch hệ thống merchant gửi sang VNPAY
        //        //order.Amount = 100000; // Giả lập số tiền thanh toán hệ thống merchant gửi sang VNPAY 100,000 VND
        //        //order.Status = "0"; //0: Trạng thái thanh toán "chờ thanh toán" hoặc "Pending" khởi tạo giao dịch chưa có IPN
        //        //order.CreatedDate = DateTime.Now;
        //        //Save order to db
        //        int price;
        //        if (month == 1) price = 50000;
        //        else price = 100000;
        //        //Build URL for VNPAY
        //        VnPayLibrary vnpay = new VnPayLibrary();

        //        vnpay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
        //        vnpay.AddRequestData("vnp_Command", "pay");
        //        vnpay.AddRequestData("vnp_TmnCode", vnp_TmnCode);
        //        vnpay.AddRequestData("vnp_Amount", (price * 100).ToString()); //Số tiền thanh toán. Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ. Để gửi số tiền thanh toán là 100,000 VND (một trăm nghìn VNĐ) thì merchant cần nhân thêm 100 lần (khử phần thập phân), sau đó gửi sang VNPAY là: 10000000

        //        vnpay.AddRequestData("vnp_BankCode", "Default");


        //        vnpay.AddRequestData("vnp_CreateDate", DateTime.Now.ToString("yyyyMMddHHmmss"));
        //        vnpay.AddRequestData("vnp_CurrCode", "VND");
        //        vnpay.AddRequestData("vnp_IpAddr", Utils.GetIpAddress(HttpContext));

        //        vnpay.AddRequestData("vnp_Locale", "vn");

        //        vnpay.AddRequestData("vnp_OrderInfo", "Payment for: " + DateTime.Now.Ticks);
        //        vnpay.AddRequestData("vnp_OrderType", "other"); //default value: other

        //        vnpay.AddRequestData("vnp_ReturnUrl", vnp_Returnurl);
        //        vnpay.AddRequestData("vnp_TxnRef", DateTime.Now.Ticks.ToString()); // Mã tham chiếu của giao dịch tại hệ thống của merchant. Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày

        //        //Add Params of 2.1.0 Version
        //        //Billing

        //        string paymentUrl = vnpay.CreateRequestUrl(vnp_Url, vnp_HashSecret);
        //        //log.InfoFormat("VNPAY URL: {0}", paymentUrl);
        //        Response.Redirect(paymentUrl);
        //        return StatusCode(StatusCodes.Status200OK,
        //            new CustomRespone<Membership>(200, paymentUrl, null, null));
        //        //End vnpay
        //    } catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status403Forbidden,
        //               new CustomRespone<Membership>(403, "An error occured while paying membership", null, ex.Message));
        //    }
        //}

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
