using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ShoppingCartItemController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public ShoppingCartItemController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    [HttpGet("{userId}")]
    public IActionResult GetCartItems(int userId)
    {
        try
        {
            var cartItems = _dbContext.ShoppingCartItems.Where(c => c.UserId == userId).ToList();

            return Ok(cartItems);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao obter itens do carrinho: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult AddToCart([FromBody] ShoppingCartItem newItem)
    {
        try
        {
            _dbContext.ShoppingCartItems.Add(newItem);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetCartItems), new { userId = newItem.UserId }, newItem);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao adicionar item ao carrinho: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveFromCart(int id)
    {
        try
        {
            var itemToRemove = _dbContext.ShoppingCartItems.FirstOrDefault(c => c.Id == id);
            if (itemToRemove != null)
            {
                _dbContext.ShoppingCartItems.Remove(itemToRemove);
                _dbContext.SaveChanges();
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao remover item do carrinho: {ex.Message}");
        }
    }
}
