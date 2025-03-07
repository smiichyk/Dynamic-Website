
// Function to get material data, including categories and recycling information.
function getMaterials() {
  return [
    {
      "type": "Plastic",
      "categories": [
        {
          "name": "PET (Polyethylene Terephthalate)",
          "recycling_code": "1",
          "recycling_process": "Plastic is shredded, melted down, and turned into new plastic products such as bottles, clothing, and insulation.",
          "accepted_items": ["Bottles", "Clothing", "Food containers"],
          "non_accepted_items": ["Toys", "Food wrappers"],
          "recyclability": "Widely recyclable",
          "environmental_impact": "High energy usage during recycling but can be reused multiple times."
        },
        {
          "name": "HDPE (High-Density Polyethylene)",
          "recycling_code": "2",
          "recycling_process": "HDPE is cleaned, shredded, and melted to create new products like piping, plastic lumber, and recycling bins.",
          "accepted_items": ["Milk jugs", "Detergent bottles", "Pipes"],
          "non_accepted_items": ["Plastic bags", "Toys"],
          "recyclability": "Highly recyclable",
          "environmental_impact": "Low environmental impact in the recycling process."
        },
        {
          "name": "PVC (Polyvinyl Chloride)",
          "recycling_code": "3",
          "recycling_process": "PVC is difficult to recycle due to the toxic chemicals released during the process, but can be used in some specialized applications.",
          "accepted_items": ["Plumbing pipes", "Vinyl flooring"],
          "non_accepted_items": ["Window frames", "Clothing"],
          "recyclability": "Low recyclability",
          "environmental_impact": "Recycling process releases harmful chemicals."
        }
      ]
    },
    {
      "type": "Glass",
      "categories": [
        {
          "name": "Clear Glass",
          "recycling_code": "7",
          "recycling_process": "Glass is melted down and remolded into new containers or other products like tiles and insulation.",
          "accepted_items": ["Bottles", "Jars", "Windows"],
          "non_accepted_items": ["Ceramics", "Pyrex"],
          "recyclability": "Infinitely recyclable without loss of quality",
          "environmental_impact": "Low impact; energy-intensive melting process."
        },
        {
          "name": "Colored Glass",
          "recycling_code": "7",
          "recycling_process": "Similar to clear glass, but may require separation and additional steps to remove colorants.",
          "accepted_items": ["Colored bottles", "Decorative glass"],
          "non_accepted_items": ["Mirrors", "Lampshades"],
          "recyclability": "Highly recyclable",
          "environmental_impact": "Low impact; requires sorting to remove contaminants."
        }
      ]
    },
    {
      "type": "Metal",
      "categories": [
        {
          "name": "Aluminum",
          "recycling_code": "41",
          "recycling_process": "Aluminum is melted and recast into new products such as cans, foil, and automotive parts.",
          "accepted_items": ["Cans", "Foil", "Aluminum frames"],
          "non_accepted_items": ["Aluminum-coated materials", "Electrical cables"],
          "recyclability": "Highly recyclable, retains quality after multiple cycles",
          "environmental_impact": "Low energy usage compared to primary aluminum production."
        },
        {
          "name": "Steel",
          "recycling_code": "40",
          "recycling_process": "Steel is shredded, melted down, and recast into new products like beams, cans, and appliances.",
          "accepted_items": ["Cans", "Appliance parts", "Construction beams"],
          "non_accepted_items": ["Painted steel", "Rusty metals"],
          "recyclability": "Highly recyclable",
          "environmental_impact": "Low impact; often requires high-temperature melting."
        }
      ]
    },
    {
      "type": "Paper",
      "categories": [
        {
          "name": "Cardboard",
          "recycling_code": "21",
          "recycling_process": "Cardboard is flattened, pulped, and reformed into new cardboard products.",
          "accepted_items": ["Shipping boxes", "Packaging", "Toilet paper rolls"],
          "non_accepted_items": ["Greasy pizza boxes", "Wax-coated boxes"],
          "recyclability": "Highly recyclable, but can be contaminated with food waste",
          "environmental_impact": "Low energy impact, but can be affected by contamination."
        },
        {
          "name": "Office Paper",
          "recycling_code": "22",
          "recycling_process": "Paper is shredded, pulped, and filtered to remove inks and adhesives, then used to make new paper products.",
          "accepted_items": ["Printer paper", "Envelopes", "Notebook paper"],
          "non_accepted_items": ["Paper towels", "Tissues"],
          "recyclability": "Highly recyclable",
          "environmental_impact": "Minimal; efficient recycling process."
        }
      ]
    },
    {
      "type": "Organic Waste",
      "categories": [
        {
          "name": "Food Scraps",
          "recycling_code": "O1",
          "recycling_process": "Food scraps are composted to create nutrient-rich soil for gardening and agriculture.",
          "accepted_items": ["Vegetable peels", "Coffee grounds", "Eggshells"],
          "non_accepted_items": ["Meat scraps", "Dairy products"],
          "recyclability": "Biodegradable, easily compostable",
          "environmental_impact": "Highly beneficial to soil, reduces methane emissions in landfills."
        },
        {
          "name": "Yard Waste",
          "recycling_code": "O2",
          "recycling_process": "Yard waste is composted or used to generate biogas energy.",
          "accepted_items": ["Grass clippings", "Leaves", "Branches"],
          "non_accepted_items": ["Weeds with seeds", "Plastic bags"],
          "recyclability": "Easily recyclable through composting or energy production",
          "environmental_impact": "Reduces landfill waste and supports sustainable energy production."
        }
      ]
    }
  ]
}

// Modal elements for adding and modifying categories and tags
let addCategoryModal = document.getElementById("addCategory")
let modifyCategoryModal = document.getElementById("modifyCategory")
let modifyTagModal = document.getElementById("modifyTag")
let tableRowModal = document.getElementById("displayTableRow")

// Close the modal if the user clicks outside
window.onclick = function(event) {
  if (event.target === addCategoryModal) {
    addCategoryModal.style.display = "none"
  }
  if (event.target === modifyCategoryModal) {
    modifyCategoryModal.style.display = "none"
  }
  if (event.target === modifyTagModal) {
    modifyTagModal.style.display = "none"
  }
}

// Use the fetch() method to read the data from the JSON file and display the data in a table
// let materials_
// window.onload = () => {
//    let url = 'recycling.json'
//    fetch(url)
//      .then(response => response.json())
//      .then(jsonData => {
//        materials_ = jsonData.categories
//      })
// }

// Declaration variables for sort() function
let sortAscendingOrder = true
let lastSortColumnName = "name"

// Active material type filter
let activeType = 'All'
let activeButton

// Flatten the materials data into a format suitable for display in a table
let materialsToDisplay = getMaterials().flatMap(material =>
  material.categories
    .filter((category) =>
      category.name ||
      category.recycling_code ||
      category.recycling_process ||
      category.accepted_items ||
      category.non_accepted_items ||
      category.non_accepted_items ||
      category.recyclability ||
      category.environmental_impact
    )
    .map(category => ({
      ...category,
      accepted_items_to_display: category.accepted_items ? category.accepted_items.join(", ") : "",
      non_accepted_items_to_display: category.non_accepted_items ? category.non_accepted_items.join(", ") : "",
      type: material.type,    // Add material type to each category for easier identification
      image: [null],          // Placeholder for images, if any
      tag: null,
    }))
)

// Function to get keys from the first category of each material type
function getKeys() {
  let keys
  getMaterials().forEach(material => {
    keys = Object.keys(material.categories[0])
  })
  return keys
}

let acceptedItems = [""]
let nonAcceptedItems = [""]
function pushAcceptedAndNonAcceptedItems() {
  getMaterials().forEach(material => {
    material.categories.forEach(category => {
      for (let i = 0; i < category.accepted_items.length; i++) {
        acceptedItems.push(category.accepted_items[i])
      }

      for (let i = 0; i < category.non_accepted_items.length; i++) {
        nonAcceptedItems.push(category.non_accepted_items[i])
      }
    })
  })
}
pushAcceptedAndNonAcceptedItems()

console.log(acceptedItems)

function displayTable(materials) {
  // Start of table
  let htmlString = `<table><tr>`

  // Header row with column names
  htmlString += `<th>Images</th>`
  getKeys().forEach(key => {
    htmlString += `<th onclick="sort('${key}')">
                    ${key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    ${lastSortColumnName === key ? sortAscendingOrder === true ? "▲" : "▼" : ""}
                   </th>`
  })
  htmlString += `<th>Tag</th>`

  // Add category button column
  htmlString += `<th>
                    <button onclick="addCategoryInput()">
                        <img src='img/work_with_category/add.png' height="50" alt="add_button"/>
                    </button>
                 </th>`
  htmlString += `</tr>`

  // Iterate through the materials to create the table rows
  materials.forEach((item, index) => {

    // Start a row with the background color
    htmlString += `<tr style="background: ${getBinColour(item.type)}" onclick="displayTableRow(${index})">`

    // Display images for each category if it exists
    htmlString += `<td data-label="image">`
    for (let i = 0; i < item.image.length; i++) {
      if (item.image[i] !== "") {
        htmlString += `<img src="${item.image[i] || 'img/image.png'}" alt="category image" width="100"/>`
      }
    }
    htmlString += `</td>`

    // Display other material details
    getKeys().forEach((key, index) => {
      if (index === 3) {
        htmlString += `<td data-label="${key}">${item.accepted_items_to_display}</td>`
      } else if (index === 4) {
        htmlString += `<td data-label="${key}">${item.non_accepted_items_to_display}</td>`
      }else {
        htmlString += `<td data-label="${key}">${item[key]}</td>`
      }
    })

    // Display tag for each category if it exists
    htmlString += `<td data-label="tag"><p class="tags" style="background: ${getTagColour(item.tag)}">${item.tag || ""}</p></td>`

    // Add modify/delete buttons
    htmlString += `<td data-label="actions" id="modify_delete">
                  <button onClick="event.stopPropagation(); deleteCategory(${index})">
                    <img src="img/work_with_category/delete.png" width="50" alt="delete_button"/>
                  </button>
                  <button onClick="event.stopPropagation(); modifyCategoryOpenModal(${index})">
                    <img src="img/work_with_category/edit.png" width="50" alt="edit_button"/>
                  </button>
                  <button onclick="event.stopPropagation(); tagOpenModal(${index})">
                   <img src="img/work_with_category/add_tag.png" width="50" alt="add_tag"/>
                   </button>
                </td>`

    // End a row
    htmlString += `</tr>`
  })

  // End of table
  htmlString += `</table>`

  // Display a table in the "categoriesTable" element
  document.getElementById("categoriesTable").innerHTML = htmlString
}

function displayTableRow(index) {
  modalWindowDisplayNone()
  tableRowModal.style.display = "block"
  let item = materialsToDisplay[index]
  // Display a table in the "displayTableRow" element
  let htmlString = `
    <table id="tableRowModal">
      <tr style="background: yellowgreen">
        <th>Images</th>
        <th>Name</th>
        <th>Recycling Code</th>
        <th>Recycling Process</th>
        <th>Accepted Items</th>
        <th>Non Accepted Items</th>
        <th>Recyclability</th>
        <th>Environmental Impact</th>
        <th>Tag</th>
      </tr>
      <tr style="background: ${getBinColour(item.type)}">`
  htmlString += `<td>`
  for (let i = 0; i < item.image.length; i++) {
    if (item.image[i] !== "") {
      htmlString += `<img src="${item.image[i] || 'img/image.png'}" alt="category image" width="100"/>`
    }
  }
  htmlString += `</td>`
  htmlString += `<td>${item.name}</td>
                 <td>${item.recycling_code}</td>
                 <td>${item.recycling_process}</td>
                 <td>${item.accepted_items_to_display}</td>
                 <td>${item.non_accepted_items_to_display}</td>
                 <td>${item.recyclability}</td>
                 <td>${item.environmental_impact}</td>
                 <td><p class="tags" style="background: ${getTagColour(item.tag)}">${item.tag || ""}</p></td>
                 <span class="close">&times;</span>
               </tr>
             </table>
             `
  document.getElementById("displayTableRow").innerHTML = htmlString
  let span = document.querySelector("#displayTableRow .close")
  span.onclick = function() {
    tableRowModal.style.display = "none"
  }
}

function getBinColour(type) {
  if (type === "Plastic" || type === "Metal" || type === "Paper") {
    return  "#5e9f5e"
  } else if (type === "Glass") {
    return  "#6e94b8"
  } else {
    return  "#d89056"
  }
}

function getTagColour(tag) {
  if (tag === "Home Recyclable") {
    return "#bd324f"
  } else if (tag === "Recycling Center") {
    return "#005175"
  }
}

function displayByType(type, clickedButton) {
  activeType = type // Set active type to the selected one
  activeButton = clickedButton  // Set active button to the clicked one
  if (type === 'All') {
    displayTable(materialsToDisplay)
  } else {
    displayTable(materialsToDisplay.filter(material => material.type === type))
  }
  setActiveButton(clickedButton)
}

function sort(key) {
  setAccepted_itemsAndNon_accepted_items()
  // Toggle sorting order if same column is clicked
  if (lastSortColumnName === key) {
    sortAscendingOrder = !sortAscendingOrder
  } else {
    lastSortColumnName = key
    sortAscendingOrder = true
  }
  // Sorting based on the selected column
  materialsToDisplay.sort((a, b) =>
    sortAscendingOrder ? a[key].toLowerCase() < b[key].toLowerCase() ? -1 : 1
                       : a[key].toLowerCase() < b[key].toLowerCase() ? 1 : -1
  )
  displayByType(activeType, activeButton)
}

function addCategoryInput() {
  modalWindowDisplayNone()
  addCategoryModal.style.display = "block"
  // Display a table in the "addCategory" element
  document.getElementById("addCategory").innerHTML = `
    <label for="type"></label><select id="type">
      <option id="plastic">Plastic</option>
      <option id="glass">Glass</option>
      <option id="metal">Metal</option>
      <option id="paper">Paper</option>
      <option id="organic">Organic Waste</option>
    </select>
    <label for="imageUrl1"></label><input type="text" placeholder="Image URL" id="imageUrl1" class="imageInput"/>
    <label for="imageUrl2"></label><input type="text" placeholder="Image URL" id="imageUrl2" class="imageInput"/>
    <label for="categoryName"></label><input type="text" placeholder="Name" id="categoryName"/>
    <label for="recyclingCode"></label><input type="text" placeholder="Recycling code" id="recyclingCode"/>
    <label for="recyclingProgress"></label><input type="text" placeholder="Recycling process" id="recyclingProgress"/>
    <label for="acceptedItems"></label><input type="text" placeholder="Accepted items" id="acceptedItems"/>
    <button class="helpButton" onclick="displayAcceptedItems()">?</button>
    <label for="nonAcceptedItems"></label><input type="text" placeholder="Non accepted items" id="nonAcceptedItems"/>
    <button class="helpButton" onclick="displayNonAcceptedItems()">?</button>
    <label for="recyclability"></label><input type="text" placeholder="Recyclability" id="recyclability"/>
    <label for="environmentalImpact"></label><input type="text" placeholder="Environmental impact" id="environmentalImpact"/>
    <button id="addCategoryButton" value="Add" onclick="addCategoryAccept(
       document.getElementById('type').value,
       [document.getElementById('imageUrl1').value, document.getElementById('imageUrl2').value,],
       document.getElementById('categoryName').value,
       document.getElementById('recyclingCode').value,
       document.getElementById('recyclingProgress').value,
       document.getElementById('acceptedItems').value,
       document.getElementById('nonAcceptedItems').value,
       document.getElementById('recyclability').value,
       document.getElementById('environmentalImpact').value
     )">Add</button>
    <span class="close">&times;</span>
  `
  let span = document.querySelector("#addCategory .close")
  span.onclick = function() {
    modalWindowDisplayNone()
  }
}

function addCategoryAccept() {
  let accepted_list = document.getElementById('acceptedItems').value.split(",").map(item => item.trim())
  let non_accepted_list = document.getElementById('nonAcceptedItems').value.split(",").map(item => item.trim())
  let missingAcceptedItems = accepted_list.filter(item => !acceptedItems.includes(item))
  let missingNonAcceptedItems = non_accepted_list.filter(item => !nonAcceptedItems.includes(item))
  if (missingAcceptedItems.length > 0 || missingNonAcceptedItems.length > 0) {
    displayAlert(missingAcceptedItems, missingNonAcceptedItems)
  } else {
    addCategory(
      document.getElementById('type').value,
      [document.getElementById('imageUrl1').value, document.getElementById('imageUrl2').value,],
      document.getElementById('categoryName').value,
      document.getElementById('recyclingCode').value,
      document.getElementById('recyclingProgress').value,
      document.getElementById('acceptedItems').value,
      document.getElementById('nonAcceptedItems').value,
      document.getElementById('recyclability').value,
      document.getElementById('environmentalImpact').value
    )
  }
}

function addCategory(type, imageUrls, name, recycling_code, recycling_process, accepted_items, non_accepted_items, recyclability, environmental_impact) {
  if (imageUrls[0]==="" && imageUrls[1]==="") {
    imageUrls = ['img/image.png']
  }
  let newCategory = {
    image: imageUrls,
    name: name,
    recycling_code: recycling_code,
    recycling_process: recycling_process,
    accepted_items_to_display: accepted_items,
    non_accepted_items_to_display: non_accepted_items,
    recyclability: recyclability,
    environmental_impact: environmental_impact,
    type: type
  }
  materialsToDisplay.push(newCategory)
  displayByType(activeType, activeButton)
  addCategoryModal.style.display = "none"
}

function modifyCategoryOpenModal(index) {
  modalWindowDisplayNone()
  modifyCategoryModal.style.display = "block"
  modifyCategoryInput(index)
}

function modifyCategoryInput(index) {
  let mtd
  if (activeType === 'All') {
    mtd = materialsToDisplay
  } else {
    mtd = materialsToDisplay.filter(material => material.type === activeType)
  }
  mtd.forEach((item, i) => {
    if (index === i) {
      // Display a table in the "modifyCategory" element
      document.getElementById("modifyCategory").innerHTML = `
      <input type="text" placeholder="Enter image URL" id="imageUrl1" value="${item.image[0] || ""}" class="imageInput"/>
      <input type="text" placeholder="Enter image URL" id="imageUrl2" value="${item.image[1] || ""}" class="imageInput"/>
      <input type="text" placeholder="Name" id="modifyCategoryName" value="${item.name}"/>
      <input type="text" placeholder="Recycling code" id="modifyRecyclingCode" value="${item.recycling_code}"/>
      <input type="text" placeholder="Recycling process" id="modifyRecyclingProcess" value="${item.recycling_process}"/>
      <input type="text" placeholder="Accepted items" id="modifyAcceptedItems" value="${item.accepted_items_to_display}"/>
      <button class="helpButton" onclick="displayAcceptedItems()">?</button>
      <input type="text" placeholder="Non accepted items" id="modifyNonAcceptedItems" value="${item.non_accepted_items_to_display}"/>
      <button class="helpButton" onclick="displayNonAcceptedItems()">?</button>
      <input type="text" placeholder="Recyclability" id="modifyRecyclability" value="${item.recyclability}"/>
      <input type="text" placeholder="Environmental impact" id="modifyEnvironmentalImpact" value="${item.environmental_impact}"/>
      <button id="modifyCategoryButton" value="Modify" onclick="modifyCategoryAccept(${index})">Modify</button>
      <span class="close">&times;</span>
    `
    }
    let span = document.querySelector("#modifyCategory .close")
    span.onclick = function() {
      modalWindowDisplayNone()
    }
  })
}

function modifyCategoryAccept(index) {
  let accepted_list = document.getElementById('modifyAcceptedItems').value.split(",").map(item => item.trim())
  let non_accepted_list = document.getElementById('modifyNonAcceptedItems').value.split(",").map(item => item.trim())
  let missingAcceptedItems = accepted_list.filter(item => !acceptedItems.includes(item))
  let missingNonAcceptedItems = non_accepted_list.filter(item => !nonAcceptedItems.includes(item))
  if (missingAcceptedItems.length > 0 || missingNonAcceptedItems.length > 0) {
    displayAlert(missingAcceptedItems, missingNonAcceptedItems)
  } else {
    modifyCategory(index)
  }
}

function modifyCategory(categoryIndex) {
  let mtd
  if (activeType === 'All') {
    mtd = materialsToDisplay
  } else {
    mtd = materialsToDisplay.filter(material => material.type === activeType)
  }
  mtd.forEach((item, index) => {
    // Modify the category
    if (categoryIndex === index) {
      let images
      if (document.getElementById('imageUrl1').value==="" && document.getElementById('imageUrl2').value==="") {
        images = ['img/image.png']
      } else {
        images = [document.getElementById('imageUrl1').value, document.getElementById('imageUrl2').value]
      }
      item.image = images
      item.name = document.getElementById('modifyCategoryName').value
      item.recycling_code = document.getElementById('modifyRecyclingCode').value
      item.recycling_process = document.getElementById('modifyRecyclingProcess').value
      item.accepted_items_to_display = document.getElementById('modifyAcceptedItems').value
      item.non_accepted_items_to_display = document.getElementById('modifyNonAcceptedItems').value
      item.recyclability = document.getElementById('modifyRecyclability').value
      item.environmental_impact = document.getElementById('modifyEnvironmentalImpact').value
    }
  })
  displayByType(activeType, activeButton)
  modifyCategoryModal.style.display = "none"
}

function deleteCategory(index) {
  // Confirm deletion before proceeding
  if (confirm("Are you sure you want to delete this category?")) {
    if (activeType === 'All') {
      materialsToDisplay.splice(index, 1)
    } else {
      const filteredMaterials = materialsToDisplay.filter(material => material.type === activeType)
      const materialToDelete = filteredMaterials[index]
      const originalIndex = materialsToDisplay.indexOf(materialToDelete)
      materialsToDisplay.splice(originalIndex, 1)
    }
    displayByType(activeType, activeButton);
  }
}

function tagOpenModal(index) {
  modalWindowDisplayNone()
  modifyTagModal.style.display = "block"
  tagInput(index)
}

function tagInput(index) {
  // Display a table in the "modifyTag" element
  document.getElementById("modifyTag").innerHTML = `
    <label for="tag"></label><select id="tag">
      <option>Home Recyclable</option>
      <option>Recycling Center</option>
    </select>
    <input type="button" value="Add" onclick="addTag(document.getElementById('tag').value, ${index})" style="background: yellowgreen"/>
    <input type="button" value="Delete Tag" onclick="deleteTag(${index})" style="background: #ee5252"/>
    <span class="close">&times;</span>
  `
  let span = document.querySelector("#modifyTag .close")
  span.onclick = function() {
    modifyTagModal.style.display = "none"
  }
}

function addTag(tag, index) {
  let mtd
  if (activeType === 'All') {
    mtd = materialsToDisplay
  } else {
    mtd = materialsToDisplay.filter(material => material.type === activeType)
  }
  mtd.forEach((item, i) => {
    if (index === i) {
      item.tag = tag
    }
  })
  displayByType(activeType, activeButton)
  modifyTagModal.style.display = "none"
}

function deleteTag(index) {
  let mtd
  if (activeType === 'All') {
    mtd = materialsToDisplay
  } else {
    mtd = materialsToDisplay.filter(material => material.type === activeType)
  }
  mtd.forEach((item, i) => {
    if (index === i) {
      item.tag = ""
    }
  })
  displayByType(activeType, activeButton)
  modifyTagModal.style.display = "none"
}

function setActiveButton(clickedButton) {
  if (!clickedButton) return
  // Toggle active state for buttons
  document.querySelectorAll("header button").forEach(button => {
    button.classList.remove("active")
  })
  clickedButton.classList.add("active")
}

function modalWindowDisplayNone() {
  addCategoryModal.style.display = "none"
  modifyCategoryModal.style.display = "none"
  modifyTagModal.style.display = "none"
  tableRowModal.style.display = "none"
}

function displayAlert(missingAcceptedItems, missingNonAcceptedItems) {
  return alert(`The following items are not supported:\n
    ❌ Missing Accepted Items: ${missingAcceptedItems.join(", ") || "None"}\n
    ❌ Missing Non-Accepted Items: ${missingNonAcceptedItems.join(", ") || "None"}\n
    Please enter valid items.`)
}

function displayAcceptedItems() {
  return alert(`✅ Supported Accepted Items: ${acceptedItems.join(", ")}.\n`)
}

function displayNonAcceptedItems() {
  return alert(`✅ Supported Non-Accepted Items: ${nonAcceptedItems.join(", ")}.\n`)
}

function setAccepted_itemsAndNon_accepted_items() {
  materialsToDisplay.forEach(item => {
    item.accepted_items = item.accepted_items_to_display
    item.non_accepted_items = item.non_accepted_items_to_display
  })
}
