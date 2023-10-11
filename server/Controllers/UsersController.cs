using Microsoft.AspNetCore.Mvc;

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
            return Ok(_dbContext.Users.ToList());
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao obter usuários: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        try
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Id == id);

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

            existingUser.login = updatedUser.login;
            // ...

            _dbContext.SaveChanges();

            return Ok(existingUser);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao atualizar usuário: {ex.Message}");
        }
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate([FromBody] AuthenticationRequest request)
    {
        try
        {
            string login = request.Login;
            string password = request.Password;

            var user = _dbContext.Users.FirstOrDefault(u => u.login == login);

            if (user == null)
            {
                return NotFound(new { Message = "User not found" });
            }

            if (user.password != password)
            {
                return Unauthorized(new { Message = "Incorrect password" });
            }
            var token = TokenService.GenerateJwtToken(user.login);

            return StatusCode(200, new { Message = "Authenticated successfully", User = user, token });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Error authenticating user: {ex.Message}" });
        }
    }
}
