//This is the title for your window tab, and your Radar
document.title = "Banner Tech Radar";


//This is the concentic circles that want on your radar
var radar_arcs = [
                   {'r':100,'name':'Must Do'}
                  ,{'r':200,'name':'Should Do'}
                  ,{'r':300,'name':'Maybe Do'}
                  ,{'r':400,'name':'On the Horizon'}
                  ,{'r':500,'name':'Not Needed'}
                 ];

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize: 
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//   r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
// - Programming Languages and Frameworks
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

var h = 1160;
var w = 1200;

var radar_data = [
    { "quadrant": "Tech Debt/Process",
        "left" : 45,
        "top" : 18,
        "color" : "#8FA227",
        "items" : [ 
            {"name":"FT Refactoring", "pc":{"r":350,"t":135},"movement":"c"},
            {"name":"Separate out Authoring/Preview, etc. from Site in CI", "pc":{"r":350,"t":95},"movement":"c"},
            {"name":"Fix SEO", "pc":{"r":250,"t":165},"movement":"c"},
            {"name":"Fix Slow Authoring Tool", "pc":{"r":250,"t":175},"movement":"c"},
            {"name":"Add JS metrics test to build pipeline", "pc":{"r":250,"t":105},"movement":"c"},
        ]
    },
    { "quadrant": "Architecture",
        "left": w-200+30,
        "top" : 18,
        "color" : "#587486",
        "items" : [ 
            {"name":"Move static assets to filesystem", "pc":{"r":30,"t":80},"movement":"t"},   
            {"name":"Introduce JavaScript dependency management", "pc":{"r":60,"t":20},"movement":"t"},   
            {"name":"Use DC2 Config Service for Banner configuration", "pc":{"r":90,"t":30},"movement":"t"},   
            {"name":"Extract out header/footer/body CSS for reuse", "pc":{"r":120,"t":60},"movement":"t"},   
            {"name":"Extract header/footer out of Melange", "pc":{"r":200,"t":50},"movement":"c"},
            {"name":"UK-315 Requests", "pc":{"r":200,"t":35},"movement":"c"},
            {"name":"Split TEST", "pc":{"r":200,"t":40},"movement":"c"}
        ]
    },
    { "quadrant": "Dependencies",
        "left" :45,
         "top" : (h/2 + 18),
        "color" : "#DC6F1D",
        "items" : [
            {"name":"Build Recipe Search Service", "pc":{"r":390,"t":265},"movement":"c"},   
            {"name":"ECSB Services Downtime", "pc":{"r":390,"t":250},"movement":"c"}
        ]
    },
    { "quadrant": "Tools/Libraries",
        "color" : "#B70062",
        "left"  : (w-200+30),
        "top" :   (h/2 + 18),
        "items" : [ 
            {"name":"Add JRebel plugin to Cinnamon", "pc":{"r":290,"t":355},"movement":"c"},   
            {"name":"Gatling", "pc":{"r":270,"t":330},"movement":"c"},
            {"name":"Heap Analysis Tools", "pc":{"r":270,"t":300},"movement":"c"}
        ]
    }
];
