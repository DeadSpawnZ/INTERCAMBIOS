/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.*;

/**
 *
 * @author Brandon
 */
public class sorteo extends HttpServlet {

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
        String codigo= request.getParameter("codigo");
        String resp;
        JSONArray jresp= Conexion.consultar("select id_intercambio, id_usuario1 from intercambio where id_grupo='"+codigo+"' and estado='CONFIRMADO';");
        if(jresp.size()<2){
            resp= "Se necesitan al menos 3 personas confirmadas en el intercambio";
        }else{
            int ci= 0, cf= jresp.size()-1;
            JSONObject tempi, tempf;
            String tp;
            while(ci<jresp.size()){
                if(cf==ci){cf= 0;}
                tempi= (JSONObject)jresp.get(ci);
                tempf= (JSONObject)jresp.get(cf);
                tp= tempf.get("id_usuario1").toString();
                if(tp.charAt(tp.length()-1)!='m'){
                    tp= tp.substring(1, tp.length()-1);
                }
                resp=Conexion.insertar("update intercambio set id_usuario2='"+tp+"' where id_intercambio="+tempi.get("id_intercambio")+"");
                System.out.println("update intercambio set id_usuario2='"+tp+"' where id_intercambio="+tempi.get("id_intercambio")+"");
                System.out.println(resp);
                ci++;
                cf=(ci>cf)?cf+1:cf-1;
            }
            resp="EXITO";
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
