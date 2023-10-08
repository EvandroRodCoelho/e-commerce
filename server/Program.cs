using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => true;

// Adicione a configuração do banco de dados ao projeto
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer("Server=EVANDRO\\SQLEXPRESS2023;Database=ecommerce;User Id=sa;Password=1234;TrustServerCertificate=True"));

builder.Services.AddControllers();

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
