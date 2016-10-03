// JavaScript Document

function calc()
{
	//Initialize vars
	var catchrate;
	
	//Initialize vars that will be assigned from the form
	var level;
	var maxHP, curHP;
	var evo, shiny, legend;
	var numInjuries;
	var numVolatile, numPersistent;
	var stuck, slow;
	
	//Assign variables
	level = parseInt(document.calcForm.level.value);
	maxHP = parseInt(document.calcForm.maxhp.value);
	curHP = parseInt(document.calcForm.curhp.value);
	evo = parseInt(document.calcForm.evo.value);
	shiny = document.calcForm.shiny.checked;
	legend = document.calcForm.legend.checked;
	numInjuries = parseInt(document.calcForm.injury.value);
	numVolatile = parseInt(document.calcForm.stvolatile.value);
	numPersistent = parseInt(document.calcForm.stpersistent.value);
	stuck = document.calcForm.stuck.checked;
	slow = document.calcForm.slow.checked;
	
	/*document.getElementById("result").innerHTML = "Level: " + level + "\n" +
	"Max HP: " + maxHP + "\n" +
	"Current HP: " + curHP + "\n" +
	"Evolutions Remaining: " + evo + "\n" +
	"Shiny? " + shiny + "\n" +
	"Legendary? " + legend + "\n" +
	"Number of Injuries: " + numInjuries + "\n" +
	"Number of Volatile Status Effects: " + numVolatile + "\n" +
	"Number of Persistent Status Effects: " + numPersistent + "\n" +
	"Stuck? " + stuck + "\n" +
	"Slowed? " + slow;*/
	
	if(!checkForNaN(level, maxHP, curHP, evo, numInjuries, numVolatile, numPersistent))
	{
		catchrate = calcCatchRate(level, maxHP, curHP, evo, shiny, legend, numInjuries, numVolatile, numPersistent, stuck, slow);
		document.getElementById("result").innerHTML = "Catch Rate: " + catchrate;
	}
	else
	{
		document.getElementById("result").innerHTML = "ERROR! SOME INPUTS NOT ENTERED.";
	}
}

function checkForNaN(c_level, c_maxHP, c_curHP, c_evo, c_numInjuries, c_numVolatile, c_numPersistent)
{
	if(isNaN(c_level))         return true;
	if(isNaN(c_maxHP))         return true;
	if(isNaN(c_curHP))         return true;
	if(isNaN(c_evo))           return true;
	if(isNaN(c_numInjuries))   return true;
	if(isNaN(c_numVolatile))   return true;
	if(isNaN(c_numPersistent)) return true;
	
	return false;
}

function calcCatchRate(c_level, c_maxHP, c_curHP, c_evo, c_shiny, c_legend, c_numInjuries, c_numVolatile,
						c_numPersistent, c_stuck, c_slow)
{
	//Before we begin, calculate the Pokemon's 75%, 50%, and 25% HP marks
	var seventy_five, fifty, twenty_five;
	
	seventy_five = Math.floor(c_maxHP * .75);
	fifty = Math.floor(c_maxHP / 2);
	twenty_five = Math.floor(c_maxHP * .25);
	
	//Catch rate starts at 100
	var rate = 100;
	
	//First, subtract catchrate from the Pokemon's level x2	
	rate -= (c_level * 2);
	
	//Next, we need to add or substract based on the Pokemon's current HP value.
	//If curHP > 75%, subtract 30.
	//If curHP <= 75% AND curHP > 50%, subtract 15.
	//If curHP <= 50% AND curHP > 25%, catchrate is not modified.
	//If curHP <= 25% AND curHP != 1, add 15.
	//If curHP == 1, add 30.
	if(c_curHP > seventy_five)
	{
		rate -= 30;
	}
	
	if(c_curHP <= seventy_five && c_curHP > fifty)
	{
		rate -= 15;
	}
	
	if(c_curHP <= twenty_five && c_curHP != 1)
	{
		rate += 15;
	}
	
	if(c_curHP == 1)
	{
		rate += 30;
	}
	
	//Check evolutionary stage.
	//If there are 2 evolutions remaining, add 10.
	//If there is 1 evolution remaining, catchrate is unmodified.
	//If there are 0 evolutions remaining, subtract 10.
	if(c_evo == 2)
	{
		rate += 10;
	}
	 
	if(c_evo == 0)
	{
		rate -= 10;
	}
	
	//Now for rarity.
	//If a Pokemon is shiny, subtract 10.
	//If a Pokemon is legendary, subtract 30.
	if(c_shiny)
	{
		rate -= 10;
	}
	
	if(c_legend)
	{
		rate -= 30;
	}
	
	//Check for status conditions
	//For every persistent status affliction, add 10.
	//For every volatile status condition, add 5.
	//If a Pokemon is stuck, add 10.
	//If a Pokemon is slowed, add 5.
	if(c_stuck)
	{
		rate += 10;
	}
	
	if(c_slow)
	{
		rate += 10;
	}
	
	rate += (c_numPersistent * 10);
	rate += (c_numVolatile * 5);
	
	//And finally, injuries. 
	//For every injury, add 5.
	rate += (c_numInjuries * 5);
	
	return rate;
}

function addLoadEvent(funct)
{
	var oldOnLoad = window.onload;
	
	if(typeof window.onload != "function")
	{
		window.onload = funct;
	}
	else
	{
		window.onload = function()
		{
			oldOnLoad();
			funct();
		}
	}
}

function getDataTables()
{
	if(!document.getElementsByTagName)
	{
		return false;
	}
	
	var tables = document.getElementsByTagName("table");
	
	for(var i = 0; i < tables.length; i++)
	{
		if(tables[i].className === "calctable")
		{
			stripes(tables[i]);
		}
	}
}

function stripes(table)
{
	var tableRows = table.getElementsByTagName("tr");
	
	for(var i = 0; i < tableRows.length; i++)
	{
		if((i % 2) !== 0)
		{
			tableRows[i].className = "trlight";
		}
	}
}

addLoadEvent(getDataTables);