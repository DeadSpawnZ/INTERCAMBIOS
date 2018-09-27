/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author Brandon
 */
@WebServlet(urlPatterns = {"/valK"})
public class valK extends HttpServlet {

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
        response.setContentType("text/html;charset=UTF-8");
        HttpSession misession = (HttpSession) request.getSession();
        String id_usuario1 = (String) misession.getAttribute("id_usuario");
        
        String codigo=(String) request.getParameter("codigo");
        
        String resp= "El intercambio no existe o bien no has sido invitado.";
        JSONArray jresp= Conexion.consultar("select id_intercambio, estado from intercambio where id_grupo='"+codigo+"' and id_usuario1='"+id_usuario1+"';");
        if(jresp.size()>0){
            JSONObject temp= (JSONObject)jresp.get(0);
            if(temp.get("estado").toString().equals("CONFIRMADO")){
                resp="Ya has confirmado tu invitación a este intercambio";
            }else{
                resp= "EXITO";
                misession.setAttribute("id_sorteointer", temp.get("id_intercambio").toString());
                //misession.setAttribute("sorteoq", "update intercambio set estado='CONFIRMADO' where id_intercambio="+((int)temp.get("id_intercambio"))+";");
            }  
        }
            
        response.getWriter().write(resp);
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
