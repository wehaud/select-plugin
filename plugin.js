(function( $ ) {

  $.fn.wselect = function(options) {

    options = $.extend({
      placeholder: "Choose option",
      disabledChoices: [],
      toggleDuration: 400,
      multi: true,
      choice: [{
        name: "Variant 1",
        index: "choice1"
      }],
      getRespond: function(val) {}
    }, options);

 
    let index = 0;

    
    $(document).on('click', function(){
      $('.wselect__box.opened').stop().slideUp(options.toggleDuration, function() {
        $(this).parent().css("z-index", 1);
      }).removeClass("opened").ready();
    })
    

    $(this).each(function(){

      
        $(this).click(function(e) {
          e.stopPropagation();
        });

        // $(this).focusout(function (){
        //   hide();
        // });

        index++;

        let structure = "",
        selectedValues = [],
        selectedValuesNames = [],
        type;

        type = options.multi ? "checkbox" : "radio";

        const container = this.attributes[0].nodeValue;
  
        structure = `
          <div class="wselect__input" id="${container}input">
              <input readonly class="wselect__field" placeholder="${options.placeholder}" id="${container}__selected"/>
              <div class="wselect__decoration">
                  <span id="${container}__count" class="wselect__count"></span>
                  <img src="../../../static/fonts/arrow.svg" alt="arrow">
              </div>
          </div>
          <div class="wselect__box" id="${container}__box">
            <ul class="wselect__options">
        `;

        //creating options (checking if disabled)
        for (var li = 1; li < options.choice.length + 1; li++) {
          var isDisabled = "false";
          if (options.disabledChoices[0] == "all") isDisabled = "true";
          $.each(options.disabledChoices, function(i) {
            if (li == this) {
                isDisabled = "true";
            }
          })
          let id = container + "__choice" + li;
          structure +=`
                <li class="wselect__option"
              `
          if (isDisabled == "true") {
            structure += disabled="disabled
            
          }

          structure += `">
          <input `

          if (isDisabled == "true") {
            structure += `disabled="disabled"
              `
          }
          structure +=`
                   value="${options.choice[li - 1].index}" name="${container}" type="${type}" class="option__${type}" id="${id}" >
                  <label for="${id}">${options.choice[li - 1].name}</label>
                </li>
              `
        }

        console.log(options.choice)

        structure += `
            </ul>
        </div>`;


        $(this).append(structure);

        const input = $("#" + container + "__input");
        const box = $("#" + container + "__box");
        const count = $("#" + container + "__count");


        //CSS
        $("#" + container).css("width", "fit-content");
        $("#" + container).css("position", "relative");
        console.log(index);
        console.log(index * 2);
        $("#" + container).css("z-index", index * 2);
        $(box).css("z-index", index * 1);

        //listen to user`s choice
        $(function () {
          var c = $(input[name=${container}]:checked).length;
          displaySelected();

$(input[name=${container}]).change(function (e, a) {   
            let chosen, received = this.value;
            $.each(options.choice, function(i) {
              if (received == this.index) {
                chosen = this;
              }
            })
            if (this.checked) {
                  c += a ? -1 : 1;
                  if (options.multi == true) {
                    selectedValues.push(chosen);
                    selectedValuesNames.push(" " + chosen.name);
                  } else {
                    selectedValues.shift();
                    selectedValuesNames.shift();
                    selectedValues.push(chosen);
                    selectedValuesNames.push(" " + chosen.name);
                    displaySelected();
                    hide();
                  }
                  
            } else {
                c += a ? 1 : -1;
                selectedValues = selectedValues.filter( value => value.index !== chosen.index);
                selectedValuesNames = selectedValuesNames.filter( value => value !== " " + chosen.name);
            }
            options.getRespond(selectedValues);
            displaySelected();
          });
      });

      //open options
      $(input).click(function() {
        if ($(box).hasClass("opened")) {
          hide();
        } else {
          $("#" + container).css("z-index", 1000);
          $(box).stop().slideDown(options.toggleDuration).addClass("opened");
        }
      });

      function hide() {
        $(box).stop().slideUp(options.toggleDuration, function() {
          $("#" + container).css("z-index", 1);
        }).removeClass("opened").ready();
      };

      
      function displaySelected() {

        $("#" + container + "__selected").val(selectedValuesNames);

        if (selectedValues.length > 0 && options.multi == true) {
          $(count).css("opacity", "100");
          $(count).text(selectedValues.length);
        } else {
          $(count).css("opacity", "0");
        }
      }
  })

    return this;
  };

})(jQuery);
