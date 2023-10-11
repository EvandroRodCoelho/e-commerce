using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class OrderItemController : Controller
{
    private readonly ApplicationDbContext _dbContext;

    public OrderItemController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> CreateOrder(OrderItem order)
    {
        try
        {
            Console.Write(order);
            order.CreatedAt = DateTime.Now;
            var itemInCart = await _dbContext.ShoppingCartItems.FirstOrDefaultAsync(item => item.Id == order.ShoppingCartItemId);

            if (itemInCart != null)
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == itemInCart.ProductId);

                if (product != null && itemInCart.Quantity <= product.quantity)
                {
                    _dbContext.OrderItem.Add(order);

                    product.quantity -= itemInCart.Quantity;

                    _dbContext.ShoppingCartItems.Remove(itemInCart);

                    await _dbContext.SaveChangesAsync();
                    return Ok(order);
                }
                else
                {
                    return BadRequest("Quantidade no carrinho é maior que a quantidade em estoque");
                }
            }
            else
            {
                return BadRequest("Item no carrinho não encontrado");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            if (ex.InnerException != null)
            {
                Console.WriteLine(ex.InnerException.Message);
            }

            return StatusCode(500, ex.Message);
        }
    }


    [HttpDelete]
    public async Task<IActionResult> DeleteOrder(int orderId)
    {
        var order = await _dbContext.OrderItem.FirstOrDefaultAsync(o => o.Id == orderId);
        if (order != null)
        {
            _dbContext.OrderItem.Remove(order);
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
        return NotFound();
    }

    [HttpGet]
    public IActionResult GetProducts()
    {
        try
        {
            var orders = _dbContext.OrderItem.ToList();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
