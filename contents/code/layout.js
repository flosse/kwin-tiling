/********************************************************************
 KWin - the KDE window manager
 This file is part of the KDE project.

Copyright (C) 2012 Mathias Gottschlag <mgottschlag@gmail.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*********************************************************************/

var Direction = {
    Up : 0,
    Down : 1,
    Left : 2,
    Right : 3
};

/**
 * Base class for all tiling layouts.
 * @class
 */
function Layout(screenRectangle) {
    /**
     * Screen area which is used by the layout.
     */
    this.screenRectangle = screenRectangle;
    /**
     * Geometry of the different tiles. This array stays empty in the case of
     * floating layouts.
     */
    this.tiles = [];
    // TODO
}

Layout.prototype.setLayoutArea = function(area) {
    var oldArea = this.screenRectangle;
    this.onLayoutAreaChange(oldArea, area);
}

Layout.prototype.onLayoutAreaChange = function(oldArea, newArea) {
	var xoffset = newArea.x - oldArea.x;
	var yoffset = newArea.y - oldArea.y;
	var wscale  = newArea.width / oldArea.width;
	var hscale  = newArea.height / oldArea.height;
	print(oldArea.width, newArea.width);
	this.tiles.forEach(function(tile) {
		var newRect = Qt.rect(tile.rectangle.x + xoffset,
							  tile.rectangle.y + yoffset,
							  tile.rectangle.width * wscale,
							  tile.rectangle.height * hscale);
		tile.rectangle = newRect;
	});
	this.screenRectangle = newArea;
}
