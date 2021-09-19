
/* allCategoriesArr = []
    allCategories = Array.from(document.querySelector('ul.product-categories').querySelectorAll(' li.cat-parent'))


allCategories.forEach(bc => {


    categoryName = bc.querySelector('a').innerText

    categoryObj = {
        categoryName,
        subCategories: []
    }


    subCategoryOfBc = Array.from(bc.querySelectorAll('ul.children li'))

    subCategoryOfBc.forEach(sc => {
        subCategoryName = sc.querySelector('a').innerText
        categoryObj.subCategories.push(subCategoryName)
    })

    allCategoriesArr.push(categoryObj)
    
}) */

allCategories = [
    {
      categoryName: "Agricultural and Energy Industry",
      subCategories: [
        "Agricultural Commodities",
        "Cocoa and Sugar",
        "Corn and Wheat",
        "CPO",
        "Crack Spread",
        "Crude Oil",
        "Naphtha",
        "Oil and Gas",
        "Oilfield Services",
        "Rubber",
        "Soyameal and Soyaoil",
      ],
    },
    {
      categoryName: "Bursa Malaysia Sector",
      subCategories: [
        "BM Construction",
        "BM Consumer Products & Services",
        "BM Energy",
        "BM Financial Services",
        "BM Health Care",
        "BM Industrial",
        "BM Industrial Products & Services",
        "BM Plantation",
        "BM Property",
        "BM Reit",
        "BM Technology",
        "BM Telecommunications & Media",
        "BM Trading & Services",
        "BM Transportation & Logistics",
        "BM Utilities",
      ],
    },
    {
      categoryName: "Consumer Industry",
      subCategories: [
        "Alcohol and Tobacco",
        "Apparel",
        "Commercial Services",
        "Consumer",
        "Consumer Services",
        "Environmental Services",
        "Food and Beverages",
        "Gold",
        "Marketing Services",
        "Office Equipments",
        "Paper",
        "Poultry",
        "Publishing",
        "Restaurants",
        "Specialty Stores",
        "Utilities",
        "Wholesale Distributors",
      ],
    },
    {
      categoryName: "Financial Industry",
      subCategories: ["Bank", "Financial Services", "Insurance"],
    },
    {
      categoryName: "FTSE Bursa Malaysia Index",
      subCategories: [
        "FBM Ace",
        "FBM Asian Palm Oil-Myr",
        "FBM Asian Palm Oil-Usd",
        "FBM Emas",
        "FBM Emas Shariah",
        "FBM Fledgling",
        "FBM Hijrah Shariah",
        "FBM Klci",
        "FBM Mid 70",
        "FBM Palm Oil Plantation",
        "FBM Small Cap",
        "FBM Top 100",
      ],
    },
    {
      categoryName: "Healthcare and Entertainment Industry",
      subCategories: [
        "Gambling",
        "Healthcare",
        "Hotels and Resorts",
        "Pharmaceuticals",
      ],
    },
    {
      categoryName: "Information Technology Industry",
      subCategories: [
        "Biotechnology",
        "Broadcasting",
        "Computer",
        "Data Processing Services",
        "Digital Service",
        "Information Technology Services",
        "Internet Services",
        "Packaged Software",
        "Telco Provider",
        "Telecommunication Equipment",
        "Telecommunications",
      ],
    },
    {
      categoryName: "Manufacturing Industry",
      subCategories: [
        "Aluminum",
        "Chemicals",
        "Copper",
        "Electrical Products",
        "Electronic Components",
        "Electronic Equipments",
        "Electronics",
        "Forest Products",
        "Furniture",
        "Gloves",
        "Industrial Machinery",
        "Industrial Products",
        "Industrial Specialties",
        "Metal Fabrication",
        "Miscellaneous Manufacturing",
        "Packaging",
        "Semiconductor",
        "Steel",
        "Textiles",
        "Tin",
      ],
    },
    {
      categoryName: "Other",
      subCategories: [
        "ACE Market",
        "Ftse Asean 40",
        "Main Market",
        "Non-Shariah Compliant",
        "Red Chip",
        "Ringgit",
        "Shariah Compliant",
      ],
    },
    {
      categoryName: "Property Industry",
      subCategories: [
        "Building Materials",
        "Construction",
        "Engineering",
        "Home Furnishings",
        "Property Developer",
        "Real Estate Investment Trust",
      ],
    },
    {
      categoryName: "Transportation Industry",
      subCategories: [
        "Auto Parts",
        "Aviation",
        "Couriers",
        "Marine Shipping",
        "Motor Trading",
        "Port Operator",
        "Transportation",
      ],
    },
  ];
  
  allMainCategories = []
  allCategories.forEach(c => {
      allMainCategories.push(c.categoryName)
  })