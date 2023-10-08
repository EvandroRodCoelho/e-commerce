using Azure;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public UsersController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    [HttpGet]
    public IActionResult GetUsers()
    {
        try
        {
            // Obtém todos os usuários do banco de dados

            return Ok(_dbContext.Users.ToList());
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
            // return StatusCode(500, $"Erro ao obter usuários: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        try
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id); // Obtém um usuário pelo ID

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao obter usuário: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] Users newUser)
    {
        try
        {
            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao criar usuário: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateUser(int id, [FromBody] Users updatedUser)
    {
        try
        {
            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Id == id);

            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.login = updatedUser.login; // Atualiza as propriedades conforme necessário
            // ...

            _dbContext.SaveChanges();

            return Ok(existingUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar usuário: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        try
        {
            var userToDelete = _dbContext.Users.FirstOrDefault(u => u.Id == id);

            if (userToDelete == null)
            {
                return NotFound();
            }

            _dbContext.Users.Remove(userToDelete);
            _dbContext.SaveChanges();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao excluir usuário: {ex.Message}");
        }
    }
}
