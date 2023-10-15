using ClassLib.DataAccess;
using ClassLib.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FactoryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ItemsContext _context;
        public ItemsController(ItemsContext db) { _context = db; }

        // Create a new item
        [HttpPost]
        public async Task<ActionResult<Items>> CreateItem(Items item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
         
            return CreatedAtAction("GetItem", new { id = item.ID }, item);
        }

        // Retrieve a single item
        [HttpGet("{id}")]
        public async Task<ActionResult<Items>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // Retrieve all items (only if you'll be using an ORM framework)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Items>>> GetAllItems()
        {
            List<Items> itemslist = await _context.Items.ToListAsync();
            bool isEmpty = !itemslist.Any();
            if (isEmpty)
            {
                return NoContent();
            }
            else
                return itemslist;
        }

        // Update an existing item
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, Items item)
        {
            if (id != item.ID)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.ID == id);
        }

    }
}
