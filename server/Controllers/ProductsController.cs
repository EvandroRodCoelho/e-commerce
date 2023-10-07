using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        return new string[] { "Produto1", "Produto2" };
    }

    // GET api/produtos/5
    [HttpGet("{id}")]
    public ActionResult<string> Get(int id)
    {
        return "Produto";
    }

    // POST api/produtos
    [HttpPost]
    public void Post([FromBody] string value)
    {
    }

    // PUT api/produtos/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/produtos/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
}
