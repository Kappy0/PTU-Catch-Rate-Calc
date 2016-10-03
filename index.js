// JavaScript Document

function calc()
{
	//Initialize vars
	
	//Catch Rate always starts at 100
	var catchrate = 100;
	
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
	
	document.getElementById("result").innerHTML = "Level: " + level + "\n" +
	"Max HP: " + maxHP + "\n" +
	"Current HP: " + curHP + "\n" +
	"Evolutions Remaining: " + evo + "\n" +
	"Shiny? " + shiny + "\n" +
	"Legendary? " + legend + "\n" +
	"Number of Injuries: " + numInjuries + "\n" +
	"Number of Volatile Status Effects: " + numVolatile + "\n" +
	"Number of Persistent Status Effects: " + numPersistent + "\n" +
	"Stuck? " + stuck + "\n" +
	"Slowed? " + slow;
	
	/*if(checkIfNaN(level, maxHP, curHP, evo, numInjuries, numVolatile, numPersistent) == true)
	{
		document.getElementById("result").innerHTML = "TEXT WILL GO HERE!";
	}
	else
	{
		document.getElementById("result").innerHTML = "ERROR! SOME INPUTS NOT ENTERED.";
	}*/
}

/*function checkIfNaN(var c_level, var c_maxHP, var c_curHP, var c_evo, var c_numInjuries, var c_numVolatile, var c_numPersistent)
{
	var bool = true;
	
	if(isNaN(c_level))         {bool = false;}
	if(isNaN(c_maxHP))         {bool = false;}
	if(isNaN(c_curHP))         {bool = false;}
	if(isNaN(c_evo))           {bool = false;}
	if(isNaN(c_numInjuries))   {bool = false;}
	if(isNaN(c_numVolatile))   {bool = false;}
	if(isNaN(c_numPersistent)) {bool = false;}
	
	return bool;
}*/

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