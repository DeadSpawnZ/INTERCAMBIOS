/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.Charset;
import java.util.Random;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;

/**
 *
 * @author Spawn
 */
public class Agrega_Inter extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        HttpSession misession = (HttpSession) request.getSession();
        String id_usuario1 = (String) misession.getAttribute("id_usuario");
        String temas = (String)request.getParameter("temas");
        String monto_max = (String)request.getParameter("monto_max");
        String fecha_inter = (String)request.getParameter("fecha_inter");
        String fecha_limite = (String)request.getParameter("fecha_limite");
        String comentarios = (String)request.getParameter("comentarios");
        String participantes = (String)request.getParameter("participantes");
        String estado = "PENDIENTE";
        String codigo = UUID.randomUUID().toString().replace("-", "").toUpperCase().substring(0, 10);
        String resp = Conexion.insertar("INSERT INTO grupo(codigo, id_creador, temas, monto_max, fecha_inter, fecha_limite, comentarios) VALUES('"+
                codigo+"','"+id_usuario1+"','"+temas+"','"+monto_max+"','"+fecha_inter+"','"+fecha_limite+"','"+comentarios+"');");
        
        String[] parts = participantes.replace("[","").replace("]","").replace((char)34, (char)0).split(",");
        String resp2 = "";
        for(int i = 0; i < parts.length; i++){
            resp2 = Conexion.insertar("INSERT INTO intercambio(id_grupo, id_usuario1, estado) VALUES('"+
                codigo+"','"+parts[i]+"','"+estado+"');");
        }
        response.getWriter().write(resp+resp2);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
