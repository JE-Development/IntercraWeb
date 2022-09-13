package com.example.application.views.search;

import com.example.application.views.MainLayout;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.component.html.*;

@PageTitle("Hello World")
@Route(value = "hello", layout = MainLayout.class)
@RouteAlias(value = "", layout = MainLayout.class)
public class SearchFieldView extends HorizontalLayout {

    public SearchFieldView(){
        setSizeFull();
        setDefaultVerticalComponentAlignment(Alignment.CENTER);

        VerticalLayout mainLayout = new VerticalLayout();
        mainLayout.setDefaultHorizontalComponentAlignment(Alignment.CENTER);
        mainLayout.addClassNames("searchLayout");

        Image logoText = new Image("images/intercra_text.png", "Intercra");
        logoText.setHeight("80px");
        mainLayout.add(logoText);

        TextField searchField = new TextField();
        searchField.setPlaceholder("Search Here");
        searchField.setWidth("500px");
        mainLayout.add(searchField);

        add(mainLayout);

    }

}
