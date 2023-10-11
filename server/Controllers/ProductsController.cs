using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public ProductsController(ApplicationDbContext dbContext) => _dbContext = dbContext;

    [HttpGet]
    public IActionResult GetProducts()
    {
        try
        {
            var products = _dbContext.Products.ToList();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error retrieving products: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetProduct(int id)
    {
        try
        {
            var product = _dbContext.Products.FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error retrieving product: {ex.Message}");
        }
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] Product newProduct)
    {
        try
        {
            _dbContext.Products.Add(newProduct);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetProduct), new { id = newProduct.Id }, newProduct);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error creating product: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProduct(int id, [FromBody] Product updatedProduct)
    {
        try
        {
            var existingProduct = _dbContext.Products.FirstOrDefault(p => p.Id == id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.name = updatedProduct.name;


            _dbContext.SaveChanges();

            return Ok(existingProduct);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error updating product: {ex.Message}");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteProduct(int id)
    {
        try
        {
            var productToDelete = _dbContext.Products.FirstOrDefault(p => p.Id == id);

            if (productToDelete == null)
            {
                return NotFound();
            }

            _dbContext.Products.Remove(productToDelete);
            _dbContext.SaveChanges();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting product: {ex.Message}");
        }
    }
}
