document.addEventListener('DOMContentLoaded', function () {

    WebsiteProto = (function () {

        const app = {};

        /* 
         * =====================================================================
         * Private Members
         * =====================================================================
         */

        app.init = function () {
            app.bindings();
        };

        app.bindings = function () {

//            fetch('../../resources/module-assets/website/js/data.json')
//                .then(response => response.json())
//                .then(response => {
//                    data = response;
//                })
//                .catch(error => console.log(error));


//            Prosoft.addEventListener('click', '#table-users', function(e){
//                
//                Prosoft.sort('#tbody-users');
//
////                const x = Prosoft.filter('#tbody-users', 'tr', {
////                    customOr: function(child) {
////                        const f = child.data['first-name'];
////                        return f.startsWith('S');
////                    }
////                });
////                
//
//
//            });
        
//            Prosoft.ajaxFetch({
//                url: '../../resources/module-assets/website/js/data.json',
//                success: function(res){
//                    
//                    const prosoft = res['prosoft'];
//                    const employees = prosoft['employees'];
//                    const tBody = document.getElementById('tbody-users');
//                    employees.forEach(function(employee, key){
//                        
//                        employee['id'] = parseInt(employee['id']);
//                        
//                        var tr = document.createElement('tr');
//                        tr.innerHTML = `<td>${employee['id']}</td>
//                                            <td>${employee['nickname']}</td>
//                                            <td>${employee['first-name']}</td>
//                                            <td>${employee['last-name']}</td>`;
//                        tr.data = employee;
//                        tBody.append(tr);
//                    });
//                    
//                    
//                    
//                },
//                failed: function(e) {
//                    alert(e);
//                }
//            });
                
            
            

            
        };

        app.init();

        /* 
         * =====================================================================
         * Public Members
         * =====================================================================
         */

        return {
//            functionName: function(params) {
//                return app.functionName(params);
//            },
        };

    }());

});