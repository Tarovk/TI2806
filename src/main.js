/* globals define, octopeerHelper, svgCreator, RSVP, modules : true, ajax */
/* exported ajax */
//http://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
define(['modules/moduleList'], function (dynModules) {

    require(dynModules[0], function (module) {
        octopeerHelper.defaultModule = module;
    });
    /*jshint maxstatements:34*/
    require(dynModules[1], function () {

        // Set global modules variable to a list of all imported modules after converting pseudo-array to array
        modules = Array.prototype.slice.call(arguments);

        function performDataRequests(data, module, callback) {
            var promises = [];
            for (var i = 0 ; i < data.length ; i++) {
                var promise = data[i].serviceCall();
                promise.onSuccess = data[i].onSuccess;
                promises.push(promise);
            }
            RSVP.all(promises).then(function (objects) {
                callback(objects);
                /* TODO if (singleFail(objects) && module.failBody) {
                    $(module.failBody()).appendTo(outerdiv);
                }
                else {
                    $(module.body(objects)).appendTo(outerdiv);
                }*/
            });
        }

        function drawLegend(module) {
            var legendData = octopeerHelper.getSafeModuleValue(module, "legend");
            var legend = d3.select(module.svg).append("g")
                .attr("class", "legend");
            for (var i = 0 ; i < legendData.length ; i++) {
                switch (legendData[i].type) {
                    case "linewith":
                    case "line":
                        legend.append("line")
                            .attr("x1", 635)
                            .attr("y1", -30 + i * 25)
                            .attr("x2", 665)
                            .attr("y2", -30 + i * 25)
                            .attr("style", legendData[i].style);
                        legend.append("text")
                            .attr("x", 630)
                            .attr("y", -25 + i * 25)
                            .attr("text-anchor", "end")
                            .text(legendData[i].text);
                        break;
                    case "dot":
                    case "rect":
                        legend.append("rect")
                            .attr("x", 635)
                            .attr("y", -40 + i * 25)
                            .attr("width", 30)
                            .attr("height", 20)
                            .attr("style", legendData[i].style);
                        legend.append("text")
                            .attr("x", 630)
                            .attr("y", -25 + i * 25)
                            .attr("text-anchor", "end")
                            .text(legendData[i].text);
                        break;
                }
            }
        }

        function addCustomBody(module, outerdiv) {
            if (module.prebody !== undefined) {
                $(module.prebody().node()).appendTo(outerdiv);
                performDataRequests(module.data, module, function (objects) {
                    module.body(objects);
                });
            } else {
                if (module.data) {
                    performDataRequests(module.data, module, function (objects) {
                        $(module.body(objects).node()).appendTo(outerdiv);
                    });
                } else {
                    //Expects the modules to return a d3 encapsulated element
                    $(module.body().node()).appendTo(outerdiv);
                }
            }
        }

        function addDefaultBody(module, outerdiv) {
            outerdiv = $(document.createElement('div'))
                .addClass('card')
                .addClass("hoverable")
                //The 'relative' class allow us to place absolute elements inside the card
                .addClass("relative")
                .appendTo(outerdiv);
            outerdiv = $(document.createElement('div'))
                .addClass('card-content')
                .appendTo(outerdiv);
            $(document.createElement('span'))
                .addClass("card-title")
                .addClass("truncate")
                .addClass("flow-text")
                .html(module.title)
                .appendTo(outerdiv);
            $(document.createElement('li'))
                .addClass("material-icons")
                .addClass("warningBadge")
                .html("warning")
                .appendTo(outerdiv);
            $(document.createElement('li'))
                .addClass("material-icons")
                .addClass("errorBadge")
                .html("error")
                .appendTo(outerdiv);
            var svg;
            if (module.customSVGSize !== undefined) {
                svg = svgCreator.createSVG(
                    module,
                    module.customSVGSize.w,
                    module.customSVGSize.h
                );
            } else {
                svg = svgCreator.createSVG(module);
            }
            svg.style('overflow',octopeerHelper.getSafeModuleValue(module,'SVGoverflow'));
            svg.append('g')
                .attr("class","content");
            module.svg = svg.node();
            $(module.svg).appendTo(outerdiv);
            drawLegend(module);
            $(outerdiv).append($('#spinner-template').html());
            if (module.data) {
                performDataRequests(module.data, module, function (objects) {
                    $(module.body(objects).node()).appendTo($(module.svg).find('g.content'));
                    octopeerHelper.scaleAxes(module, objects);
                    outerdiv.find(".spinner").addClass("hidden");
                });
            } else {
                //Expects the modules to return a d3 encapsulated element
                $(module.body().node()).appendTo($(module.svg).find('g.content'));
                octopeerHelper.scaleAxes(module, null);
                outerdiv.find(".spinner").addClass("hidden");
            }
        }

        //For each module, read its arguments, set up divs to append to, execute the Ajax calls 
        //if available and append it to the DOM.

        for (var i = 0; i < arguments.length; i++) {
            var parentContainer = $('div#bodyrow');
            if (arguments[i].parentSelector) {
                parentContainer = $(arguments[i].parentSelector);
            }
            var outerdiv = $(document.createElement('div'))
                .attr('id', arguments[i].name)
                .addClass('col s12 ' + octopeerHelper.getSafeModuleValue(arguments[i], "size"))
                .appendTo(parentContainer);
            if (arguments[i].customContainer) {
                addCustomBody(arguments[i], outerdiv);
            } else {
                addDefaultBody(arguments[i], outerdiv);
            }
        }

    });

});

