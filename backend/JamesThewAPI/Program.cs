using JamesThewAPI.Entities;
using JamesThewAPI.ModelUtility.FIleService;
using JamesThewAPI.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//Database Context 
builder.Services.AddDbContext<ProjectS3Context>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectDB"));
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey
        (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});
builder.Services.AddScoped<IFileUpload, UploadFileImp>();
builder.Services.AddScoped<ICategory, CategoryImp>();
builder.Services.AddScoped<IUser, UserImp>();
builder.Services.AddScoped<ICountry, CountryImp>();
builder.Services.AddScoped<IContest, ContestImp>();
builder.Services.AddScoped<IRecipe, RecipeImp>();
builder.Services.AddScoped<IPost, PostImp>();
builder.Services.AddScoped<IFeedback, FeedbackImp>();
builder.Services.AddScoped<IMembership, MembershipImp>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider
(Path.Combine(builder.Environment.ContentRootPath, "Public")),
    RequestPath = "/Public"
});

app.MapControllers();

app.Run();
