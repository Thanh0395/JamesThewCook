using JamesThewAPI.Entities;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _cateRepo;
        public CategoryController(ICategory cateRepo)
        {
            _cateRepo = cateRepo;
        }
        [HttpGet]
        public Task<IEnumerable<Category>> GetAllCategory()
        {
            return _cateRepo.GetCategoriesAsync();
        }
    }
}
