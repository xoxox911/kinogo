var $ = require('jquery');
var dialog = require('devextreme/ui/dialog');

require('devextreme/integration/jquery');
require('devextreme/ui/button');
require('devextreme/ui/form');
require('devextreme/ui/text_area');
require('devextreme/ui/data_grid');
require('devextreme/ui/autocomplete');


$(function(){
    var formWidget = $("#form").dxForm({
        readOnly: false,
        showColonAfterLabel: true,
        showValidationSummary: true,
        validationGroup: "customerData",
        items: [{
            itemType: "group",
            caption: "Введите данные Фильма",
            items: [{
                dataField: "Название",
                validationRules: [{
                    type: "required",
                    message: "Введите название"
                }]
            }, {
                dataField: "Жанр",
                editorType: "dxSelectBox",
                editorOptions: {
                    dataSource: genre
                },
                validationRules: [{
                    type: "required",
                    message: "Выберите жанр"
                }]
            },
                {
                    dataField: "Дата выхода",
                    editorType: "dxDateBox",
                    label: {
                        text: "Дата выхода"
                    },
                    editorOptions: {
                        invalidDateMessage: "Введите дату в правильном формате: MM/dd/yyyy"
                    },
                    validationRules: [{
                        type: "required",
                        message: "Введите дату"
                    }]
                },
                {
                    dataField: "Бюджет",
                    validationRules: [{
                        type: "required",
                        message: "Введите бюджет"
                    }, {
                        type: "pattern",
                        pattern: "^[0-9]+$",
                        message: "Только цифры"
                    }]

                },
                {
                    dataField: "Цена за просмотр",
                    editorType:"dxNumberBox",
                    validationRules: [{
                        type: "required",
                        message: "Введите цену"
                    }, {
                        type: "pattern",
                        pattern: "^[0-9]+$",
                        message: "Только цифры"
                    }]

                },
                {
                    dataField: "Страна",
                    editorType: "dxSelectBox",
                    editorOptions: {
                        dataSource: countries
                    }
                },{dataField:'Описание',
                    editorType: 'dxTextArea',
                    editorOptions: {
                        height: 200,
                        autoResizeEnabled: true
                    }
                }
                ]
        }, {
            itemType: "button",
            horizontalAlignment: "left",
            buttonOptions: {
                text: "Добавить",
                type: "success",
                useSubmitBehavior: true
            }

        },
            {
                itemType: "button",
                horizontalAlignment: "right",
                buttonOptions: {
                    text: "Скрыть/показать необязательные поля",
                    onClick: function(e) {
                        $('[aria-required=false]').closest('.dx-first-col').toggle();
                        //$('.dx-field-item-required').css({display: 'none'});
                    }
                }
            }]
    }).dxForm("instance");

    $("#form-container").on("submit", function(e) {
        e.preventDefault();
         console.log($(this).serializeArray());
        var postFilm = $(this).serializeArray();


    var dataGrid = $('#gridContainer').dxDataGrid('instance');
        dataGrid.addRow();
        $.each(postFilm,function(){
            dataGrid.cellValue(0,  this.name, this.value);
        });

        dataGrid.saveEditData();

        $('#form-container')[0].reset();
        dialog.alert('Фильм добавлен');


    });
});

$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: film,
        paging: {
            enabled: false
        },
        searchPanel: {
            visible: true
        },
        columns: ["Название", "Жанр", "Дата выхода", "Бюджет", "Цена за просмотр", "Страна", "Описание"],
        showBorders: true
    });
});

