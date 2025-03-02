| recipes jsonString |

recipes := OrderedCollection new.

recipes add: (Dictionary new
    at: 'id' put: 1;
    at: 'name' put: 'Grilled Cheese';
    at: 'ingredients' put: #('Bread' 'Cheese' 'Butter');
    at: 'instructions' put: #('Butter bread' 'Add cheese' 'Grill on pan');
    yourself).

"Convert to JSON"
jsonString := NeoJSONWriter toString: recipes.

"Print JSON output (Copy-Paste into Flask later)"
Transcript show: jsonString; cr.
